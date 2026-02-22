// Chatbot intents data ported from Mental Health Chatbot repository
export interface Intent {
    tag: string;
    patterns: string[];
    responses: string[];
}

export const chatbotIntents: Intent[] = [
    {
        tag: "greeting",
        patterns: ["Hi", "Hey", "Is anyone there?", "Hi there", "Hello", "Hey there", "Howdy", "Hola", "Bonjour", "Hay", "Sasa", "Good Evening", "Good afternoon"],
        responses: ["Hello there. Tell me how are you feeling today?", "Hi there. What brings you here today?", "Hi there. How are you feeling today?", "Great to see you. How do you feel currently?", "Hello there. Glad to see you're back. What's going on in your world right now?"]
    },
    {
        tag: "sad",
        patterns: ["I am feeling lonely", "I am so lonely", "I feel down", "I feel sad", "I am sad", "I feel so lonely", "I feel empty", "I don't have anyone"],
        responses: ["I'm sorry to hear that. I'm here for you. Talking about it might help. So, tell me why do you think you're feeling this way?", "I'm here for you. Could you tell me why you're feeling this way?", "Why do you think you feel this way?", "How long have you been feeling this way?"]
    },
    {
        tag: "stressed",
        patterns: ["I am so stressed out", "I am so stressed", "I feel stuck", "I still feel stressed", "I am so burned out"],
        responses: ["What do you think is causing this?", "Take a deep breath and gather your thoughts. Go take a walk if possible. Stay hydrated", "Give yourself a break. Go easy on yourself.", "I am sorry to hear that. What is the reason behind this?"]
    },
    {
        tag: "depressed",
        patterns: ["I can't take it anymore", "I am so depressed", "I think i'm depressed.", "I have depression"],
        responses: ["It helps to talk about what's happening. You're going to be okay", "Talk to me. Tell me more. It helps if you open up yourself to someone else.", "Sometimes when we are depressed, it is hard to care about anything. It can be hard to do the simplest of things. Give yourself time to heal."]
    },
    {
        tag: "anxious",
        patterns: ["I feel so anxious.", "I'm so anxious because of"],
        responses: ["Don't be hard on yourself. What's the reason behind this?", "Can you tell me more about this feeling?", "I understand that it can be scary. Tell me more about it.", "Don't let the little worries bring you down. What's the worse that can happen?"]
    },
    {
        tag: "happy",
        patterns: ["I feel great today.", "I am happy.", "I feel happy.", "I'm good.", "cheerful", "I'm fine", "I feel ok"],
        responses: ["That's great to hear. I'm glad you're feeling this way.", "Oh I see. That's great.", "Did something happen which made you feel this way?"]
    },
    {
        tag: "thanks",
        patterns: ["Thanks", "Thank you", "That's helpful", "Thanks for the help", "Thank you very much"],
        responses: ["Happy to help!", "Any time!", "My pleasure", "You're most welcome!"]
    },
    {
        tag: "goodbye",
        patterns: ["Bye", "See you later", "Goodbye", "Au revoir", "Sayonara", "ok bye", "Bye then", "Fare thee well"],
        responses: ["See you later.", "Have a nice day.", "Bye! Come back again.", "I'll see you soon."]
    },
    {
        tag: "help",
        patterns: ["Could you help me?", "give me a hand please", "Can you help?", "What can you do for me?", "I need support", "I need help", "Support me please"],
        responses: ["Sure. Tell me how can I assist you", "Tell me your problem so that I can assist you", "Yes, sure. How can I help you?"]
    },
    {
        tag: "sleep",
        patterns: ["I have insomnia", "I am suffering from insomnia", "I can't sleep.", "I haven't slept for the last days.", "I can't seem to go to sleep.", "I haven't had proper sleep for the past few days."],
        responses: ["What do you think is the reason behind this?", "That seems awful. What do you think is behind this?"]
    },
    {
        tag: "scared",
        patterns: ["I'm scared", "That sounds awful. What do I do?", "No I don't want to feel this way", "I am scared for myself"],
        responses: ["It's only natural to feel this way. I'm here for you.", "It'll all be okay. This feeling is only momentary.", "I understand how you feel. Don't put yourself down because of it."]
    },
    {
        tag: "death",
        patterns: ["My mom died", "My brother died", "My dad passed away", "My sister passed away", "Someone in my family died", "My friend passed away"],
        responses: ["I'm sorry to hear that. If you want to talk about it. I'm here.", "I am really sorry to hear that. I am here to help you with grief, anxiety and anything else you may feel at this time.", "My condolences. I'm here if you need to talk."]
    }
];

// Helper function to find intent from user message
export function findIntent(message: string): Intent | null {
    const lowerMessage = message.toLowerCase();

    for (const intent of chatbotIntents) {
        for (const pattern of intent.patterns) {
            if (lowerMessage.includes(pattern.toLowerCase())) {
                return intent;
            }
        }
    }

    return null;
}

// Helper function to get random response from intent
export function getRandomResponse(intent: Intent): string {
    const randomIndex = Math.floor(Math.random() * intent.responses.length);
    return intent.responses[randomIndex];
}
