import './RoastGenerator.css'
const { useState } = require("react");

function RoastGenerator() {
    const [confession, setConfession] = useState('');
    const [roast, setRoast] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const generateRoast = async () => {
        if (!confession.trim()) return;
        setIsLoading(true);
        async function query(data) {
            const response = await fetch(
                "https://router.huggingface.co/v1/chat/completions",
                {
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_HF_TOKEN}`, 
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );
            const result = await response.json();
            return result;
        }
        try {
            const response = await query({ 
                messages: [
                    {
                        role: "user",
                        // content: `Give me a short, witty roast (2 sentences max): ${confession}`
                        content: `Roast me in 2-3 sentences: ${confession}`,
                    }
                ],
                model: "HuggingFaceTB/SmolLM3-3B:hf-inference",
                // max_tokens: 100, 
            });
                let roastText = response.choices[0].message.content;
                roastText = roastText.replace(/<think>[\s\S]*?<\/think>\s*/gi, '');
        const sentences = roastText.split('. ');
        if (sentences.length > 3) {
            roastText = sentences.slice(0, 3).join('. ') + '.';
        }
        setRoast(roastText.trim());
        } catch (error) {
            console.error("Roast failed:", error);
            setRoast("Even my roasting AI is speechless. That's... impressive? 🔥");
        }
        setIsLoading(false);
    };
    return (
            <div className="roast-container">
                <h2 className="roast-title">Confess Your Social Media Sins</h2>
                <div className='roast-input-section'>
                    <textarea
                        value={confession}
                        onChange={(e) => setConfession(e.target.value)}
                        placeholder="I spent 8 hours watching cat videos..."
                        rows="4"
                        className='roast-input'
                    />
                    <button onClick={generateRoast} disabled={isLoading} className='roast-button'>
                        {isLoading ? 'Preparing your roast... 🔥' : 'Roast Me!'}
                    </button>
                </div>
                {roast && (
                    <div className="roast-answer">
                        <h3 className='answer-title'>Your Digital Intervention:</h3>
                        <p className='answer-text'>{roast}</p>
                    </div>
                )}
            </div>
        );
}

export default RoastGenerator;