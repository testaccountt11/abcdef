
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Landing() {
  const [, setLocation] = useLocation();

  const features = [
    { icon: "🚀", title: "AI Learning Path", desc: "Personalized learning journey" },
    { icon: "💡", title: "Smart Projects", desc: "Build your portfolio smartly" },
    { icon: "🌟", title: "Competitions", desc: "Win scholarships & prizes" },
    { icon: "🤝", title: "Expert Network", desc: "Connect with industry pros" }
  ];

  return (
    <div className="min-h-screen bg-gradient">
      <nav className="fixed w-full z-50 top-0 px-6 py-4">
        <div className="glass-dark max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-white">Portfolio Pro</h1>
            <div className="hidden md:flex space-x-6">
              {["About", "Learn", "Compete", "Network"].map(item => (
                <a key={item} className="text-sm text-white/70 hover:text-white transition-colors">{item}</a>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-white/80" onClick={() => setLocation("/login")}>
              Sign In
            </Button>
            <Button className="bg-accent hover:bg-accent/90" onClick={() => setLocation("/register")}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-32 px-6">
        <motion.div 
          className="max-w-7xl mx-auto text-center"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            variants={fadeIn}
          >
            Build Your Future<br/>With Portfolio Pro
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/80 mb-12 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            Create an impressive portfolio, connect with mentors, and discover opportunities tailored to your career goals.
          </motion.p>

          <motion.div 
            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 mb-20"
            variants={fadeIn}
          >
            <Button 
              size="lg"
              className="glow bg-primary hover:bg-primary/90 text-lg py-6 px-8"
              onClick={() => setLocation("/register")}
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg"
              className="glow glass-light text-lg py-6 px-8"
              variant="outline"
            >
              Watch Demo
            </Button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
            variants={fadeIn}
          >
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                className="glass-card p-6 text-center hover:transform hover:scale-105 transition-transform"
                variants={fadeIn}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
