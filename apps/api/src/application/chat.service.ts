import { GoogleGenAI } from '@google/genai';
import { ExpenseService } from './expense.service';

export class ChatService {
    private ai: GoogleGenAI;

    constructor(private expenseService: ExpenseService) {
        // Inicializa el cliente usando la variable de entorno GEMINI_API_KEY
        this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }

    async askQuestion(userId: string, question: string): Promise<string> {
        // Paso 1: Extraer fechas
        const todayUrl = new Date().toISOString();
        const dateExtractionPrompt = `
Hoy es ${todayUrl}.
El usuario ha preguntado: "${question}"
Basado en su pregunta, extrae el rango de fechas para buscar sus gastos.
Responde estrictamente en formato JSON con dos claves que sean strings ISO 8601: "startDate" y "endDate".
Si el usuario no especifica fechas (ej. solo dice "cuáles son mis gastos"), asume el mes actual (desde el día 1).
Si pide "histórico" o "todo", devuelve null para ambas.
Ejemplo de salida que debes generar:
{ "startDate": "2024-03-01T00:00:00.000Z", "endDate": "2024-03-31T23:59:59.999Z" }
`;

        let startDate: Date | undefined;
        let endDate: Date | undefined;

        try {
            const extractionResponse = await this.ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: dateExtractionPrompt,
                config: {
                    responseMimeType: 'application/json'
                }
            });

            const jsonStr = extractionResponse.text || '{}';
            const parsedDates = JSON.parse(jsonStr);

            if (parsedDates.startDate) {
                startDate = new Date(parsedDates.startDate);
            }
            if (parsedDates.endDate) {
                endDate = new Date(parsedDates.endDate);
            }
        } catch (error) {
            console.error('Error extrayendo fechas con IA, usando mes actual por defecto', error);
            // Por defecto, mes actual si falla
            const now = new Date();
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        }

        // Paso 2: Consultar la BD
        const expenses = await this.expenseService.getUserExpenses(userId, startDate, endDate);

        // Paso 3: Generar respuesta final
        const expensesData = expenses.length > 0 
            ? expenses.map(e => `- ${e.date.toISOString().split('T')[0]}: $${e.amount} (${e.description})`).join('\n')
            : 'No hay gastos registrados en ese periodo.';

        const finalPrompt = `
Eres un asistente financiero personal experto, analítico y amable.
El usuario te ha preguntado: "${question}"

Aquí están sus gastos para el periodo consultado:
${expensesData}

Responde a su pregunta de forma clara, natural y como un humano especialista. Si te preguntan por totales, súmalos. Puedes dar breves consejos de ahorro si lo ves pertinente. Usa formato Markdown.
`;

        const finalResponse = await this.ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: finalPrompt
        });

        return finalResponse.text || 'Lo siento, no pude generar una respuesta en este momento.';
    }
}
