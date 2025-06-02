import React from 'react';
    import { motion } from 'framer-motion';
    import { Linkedin, Github, FileText } from 'lucide-react';

    const Footer = () => {
      const currentYear = new Date().getFullYear();
      return (
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="py-8 mt-auto bg-background/50 border-t border-border"
        >
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} HyDE NLP Project. Developed by Sampark Bhol.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Inspired by research in Zero-Shot Dense Retrieval. AI/Backend components are conceptual for this frontend demonstration.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="https://linkedin.com/in/sampark-bhol" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://tinyurl.com/yc33cawk" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <FileText size={20} />
                <span className="sr-only">Research Paper</span>
              </a>
              {/* Add GitHub link if available */}
              {/* <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a> */}
            </div>
          </div>
        </motion.footer>
      );
    };

    export default Footer;