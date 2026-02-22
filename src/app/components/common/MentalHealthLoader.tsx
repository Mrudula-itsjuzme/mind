import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function MentalHealthLoader() {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);

    useEffect(() => {
        // Generate random particles
        const newParticles = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 3,
            duration: 3 + Math.random() * 4,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-[#050010] overflow-hidden">
            {/* Dark Space Background with Stars */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a0033_0%,_#050010_100%)]" />

            {/* Stars */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute w-px h-px bg-white rounded-full"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                    }}
                    animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Orbiting Planets & Atoms */}
            <div className="relative" style={{ width: "400px", height: "400px" }}>
                {/* Orbits */}
                {[150, 220, 300, 380].map((size, i) => (
                    <div
                        key={i}
                        className="absolute border border-white/5 rounded-full"
                        style={{
                            width: size,
                            height: size,
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)"
                        }}
                    />
                ))}

                {/* Rotating Planets */}
                {[
                    { color: "from-purple-500 to-indigo-700", size: 24, orbit: 75, speed: 10 },
                    { color: "from-blue-400 to-cyan-600", size: 16, orbit: 110, speed: 15 },
                    { color: "from-pink-500 to-rose-700", size: 20, orbit: 150, speed: 20 },
                    { color: "from-amber-400 to-orange-600", size: 12, orbit: 190, speed: 12 },
                ].map((planet, i) => (
                    <motion.div
                        key={i}
                        className="absolute left-1/2 top-1/2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: planet.speed, repeat: Infinity, ease: "linear" }}
                    >
                        <motion.div
                            className={`rounded-full bg-gradient-to-br ${planet.color} shadow-lg`}
                            style={{
                                width: planet.size,
                                height: planet.size,
                                marginLeft: planet.orbit,
                                marginTop: -planet.size / 2,
                            }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>
                ))}

                {/* Central "Sun" / Big Bang Core */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="w-12 h-12 bg-white rounded-full shadow-[0_0_50px_rgba(255,255,255,0.8)]"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="absolute inset-0 bg-yellow-200 rounded-full blur-md opacity-50" />
                    </motion.div>
                </div>
            </div>

            {/* Orbiting elements */}
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={`orbit-${index}`}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                        left: "50%",
                        top: "50%",
                        marginLeft: "-6px",
                        marginTop: "-6px",
                        background: `linear-gradient(135deg, ${index === 0 ? "#60a5fa" : index === 1 ? "#a78bfa" : "#ec4899"
                            } 0%, ${index === 0 ? "#3b82f6" : index === 1 ? "#8b5cf6" : "#db2777"} 100%)`,
                    }}
                    animate={{
                        x: Math.cos(((index * 120) * Math.PI) / 180) * 130,
                        y: Math.sin(((index * 120) * Math.PI) / 180) * 130,
                        rotate: [0, 360],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        x: { duration: 6, repeat: Infinity, ease: "linear" },
                        y: { duration: 6, repeat: Infinity, ease: "linear" },
                        rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, delay: index * 0.3 },
                    }}
                />
            ))}

            {/* Text content */}
            <div className="absolute bottom-20 flex flex-col items-center gap-6">
                <motion.p
                    className="text-2xl text-white font-light tracking-wide text-center"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    Constructing your universe...
                </motion.p>

                <div className="flex gap-2">
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="w-2 h-2 bg-purple-500 rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
