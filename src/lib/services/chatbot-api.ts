import { findIntent, getRandomResponse } from "@/lib/data/chatbot-intents";
import {
    buildSystemPrompt,
    EmotionState,
    EMOTION_DETECTION_PROMPT,
    getSafetyLayer
} from "@/lib/config/chatbot-config";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

interface ChatbotConfig {
    category: string;
    personality: string;
    conversationHistory: ChatMessage[];
}

/**
 * Chatbot API Service
 * Handles AI-powered responses with emotion-based personality switching
 */
class ChatbotService {
    private apiKey: string | null = null;
    private apiEndpoint = "https://openrouter.ai/api/v1/chat/completions";

    constructor() {
        // Try to get API key from environment
        this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || null;
    }

    /**
     * Detect user's emotional state using LLM
     */
    private async detectEmotion(userMessage: string): Promise<EmotionState> {
        try {
            if (!this.apiKey) {
                return "calm"; // Default if no API key
            }

            const response = await fetch(this.apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                    "HTTP-Referer": window.location.origin,
                    "X-Title": "MindCare Mental Health App",
                },
                body: JSON.stringify({
                    model: "openai/gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: EMOTION_DETECTION_PROMPT,
                        },
                        {
                            role: "user",
                            content: userMessage,
                        },
                    ],
                    temperature: 0.3, // Lower temperature for consistent classification
                    max_tokens: 10,
                }),
            });

            if (!response.ok) {
                console.error("Emotion detection failed:", response.statusText);
                return "calm";
            }

            const data = await response.json();
            const detectedEmotion = data.choices?.[0]?.message?.content?.trim().toLowerCase();

            // Validate emotion
            const validEmotions: EmotionState[] = [
                "calm", "stressed", "sad", "anxious",
                "overwhelmed", "grieving", "angry", "crisis"
            ];

            if (validEmotions.includes(detectedEmotion as EmotionState)) {
                console.log(`🧠 Detected emotion: ${detectedEmotion}`);
                return detectedEmotion as EmotionState;
            }

            return "calm"; // Default fallback
        } catch (error) {
            console.error("Emotion detection error:", error);
            return "calm";
        }
    }

    /**
     * Generate AI response using OpenRouter API with emotion-based personality switching
     */
    async generateResponse(
        userMessage: string,
        config: ChatbotConfig
    ): Promise<string> {
        try {
            // Try to match with predefined intents first
            const matchedIntent = findIntent(userMessage);

            if (matchedIntent) {
                return getRandomResponse(matchedIntent);
            }

            // If no API key, return fallback
            if (!this.apiKey) {
                return this.getFallbackResponse();
            }

            // STEP 1: Detect user's emotional state
            const detectedEmotion = await this.detectEmotion(userMessage);

            // STEP 2: Get appropriate safety layer
            const safetyLayer = getSafetyLayer(detectedEmotion);

            // STEP 3: Build system prompt with emotion-resolved personality and safety layer
            const systemPrompt = buildSystemPrompt(
                config.category,
                config.personality,
                detectedEmotion,
                safetyLayer
            );

            // STEP 4: Generate response with resolved personality
            const response = await fetch(this.apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`,
                    "HTTP-Referer": window.location.origin,
                    "X-Title": "MindCare Mental Health App",
                },
                body: JSON.stringify({
                    model: "openai/gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: systemPrompt,
                        },
                        {
                            role: "user",
                            content: userMessage,
                        },
                    ],
                    temperature: 0.7,
                    max_tokens: 256,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("OpenRouter API error:", errorData);
                throw new Error(`API request failed: ${response.statusText}`);
            }

            const data = await response.json();
            const aiResponse = data.choices?.[0]?.message?.content;

            if (!aiResponse) {
                throw new Error("No response from API");
            }

            return aiResponse.trim();
        } catch (error) {
            console.error("Chatbot API error:", error);
            return this.getFallbackResponse();
        }
    }

    /**
     * Fallback response when API is unavailable
     */
    private getFallbackResponse(): string {
        const fallbacks = [
            "I hear you. Can you tell me more about what you're experiencing?",
            "Thank you for sharing that with me. How are you feeling about this?",
            "I'm listening. What else is on your mind?",
            "That sounds challenging. What do you think might help?",
            "I appreciate you opening up. Can you elaborate on that?",
        ];

        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
}

// Singleton instance
export const chatbotService = new ChatbotService();
