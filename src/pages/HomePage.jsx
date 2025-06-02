import React, { useEffect } from 'react';
    import { motion, useAnimation } from 'framer-motion';
    import { useInView } from 'react-intersection-observer';
    import { useLocation } from 'react-router-dom';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
    import { Button } from '@/components/ui/button';
    import { ArrowRight, BookOpen, Brain, Code, FileText, Info, Linkedin, Users, Zap, Award } from 'lucide-react';
    import { cn } from '@/lib/utils';

    const AnimatedSectionWrapper = ({ id, children, className }) => {
      const controls = useAnimation();
      const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
      });

      useEffect(() => {
        if (inView) {
          controls.start("visible");
        }
      }, [controls, inView]);

      return (
        <motion.section
          id={id}
          ref={ref}
          className={cn("py-16 md:py-24", className)}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 60 },
            visible: { 
              opacity: 1, 
              y: 0, 
              transition: { duration: 0.7, ease: "easeOut" } 
            },
          }}
        >
          <div className="container mx-auto px-4">{children}</div>
        </motion.section>
      );
    };
    
    const AnimatedCard = ({ children, delay = 0, className }) => {
      const controls = useAnimation();
      const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
      });

      useEffect(() => {
        if (inView) {
          controls.start("visible");
        }
      }, [controls, inView]);
      
      return (
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 40, scale: 0.95 },
            visible: { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { duration: 0.5, delay: delay, ease: "easeOut" } 
            },
          }}
          className={className}
        >
          {children}
        </motion.div>
      )
    }


    const HomePage = () => {
      const location = useLocation();

      useEffect(() => {
        if (location.hash) {
          const id = location.hash.substring(1);
          setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        } else {
           window.scrollTo(0,0);
        }
      }, [location]);

      const concepts = [
        { name: "Natural Language Processing (NLP)", description: "Understanding and generating human language. Used for query understanding and hypothetical document generation.", icon: <Brain className="w-8 h-8 text-primary mb-2" /> },
        { name: "Machine Learning / Deep Learning (ML/DL)", description: "Algorithms that learn from data. Used for embedding generation and dense retrieval.", icon: <Zap className="w-8 h-8 text-primary mb-2" /> },
        { name: "Large Language Models (LLMs)", description: "AI models trained on vast text data (e.g., GPT-3.5, Llama2). Used for generating contextually relevant hypothetical documents.", icon: <BookOpen className="w-8 h-8 text-primary mb-2" /> },
        { name: "Retrieval-Augmented Generation (RAG)", description: "Enhancing LLM outputs by retrieving relevant information from external knowledge bases.", icon: <FileText className="w-8 h-8 text-primary mb-2" /> },
        { name: "Agentic AI", description: "AI systems that can reason, plan, and take actions to achieve goals. Can be used for dynamic retrieval strategies.", icon: <Users className="w-8 h-8 text-primary mb-2" /> },
      ];

      const researchPapers = [
        {
          title: "Precise Zero-Shot Dense Retrieval without Relevance Labels",
          authors: "Luyu Gao, Xueguang Ma, Jimmy Lin, Jamie Callan",
          link: "https://arxiv.org/abs/2212.10496",
          description: "The foundational paper introducing HyDE, enabling high-accuracy retrieval without labeled data by using LLMs to generate hypothetical documents."
        },
        {
          title: "Advanced RAG: Precise Zero-Shot Dense Retrieval with HyDE",
          authors: "Conceptual - Illustrative Example",
          link: "#",
          description: "This conceptual paper (for illustrative purposes in this project) would explore extensions of HyDE within Retrieval-Augmented Generation frameworks, potentially focusing on adaptive strategies or multi-hop reasoning."
        }
      ];

      return (
        <div className="pt-20"> {/* Adjusted padding top to account for fixed header */}
          <AnimatedSectionWrapper id="hero" className="bg-gradient-to-b from-background to-slate-900/70 !pt-12 md:!pt-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                  <span className="block">Exploring the Frontiers of</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
                    AI-Powered Search
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                  This project implements Hypothetical Document Embeddings (HyDE) for precise zero-shot dense retrieval, revolutionizing how we find information without needing labeled data.
                </p>
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg" asChild>
                  <a href="/search">
                    Try HyDE Search <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
              <motion.div 
                className="relative aspect-square flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                <img  className="w-full max-w-md h-auto object-contain relative z-10" alt="Abstract representation of a human brain with glowing neural pathways" src="https://images.unsplash.com/photo-1679639539537-0d2e452890f7" />
              </motion.div>
            </div>
          </AnimatedSectionWrapper>
          
          <Tabs defaultValue={location.hash ? location.hash.substring(1) : "why-hyde"} className="w-full">
            <div className="sticky top-20 z-40 bg-background/90 backdrop-blur-sm py-4 border-b border-border">
              <div className="container mx-auto px-4">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2">
                  <TabsTrigger value="why-hyde" className="py-3 text-sm sm:text-base" onClick={() => location.pathname === '/' && document.getElementById('why-hyde')?.scrollIntoView({behavior: 'smooth'})}><Info className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />Why This Project?</TabsTrigger>
                  <TabsTrigger value="concepts" className="py-3 text-sm sm:text-base" onClick={() => location.pathname === '/' && document.getElementById('concepts')?.scrollIntoView({behavior: 'smooth'})}><BookOpen className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />Key Concepts</TabsTrigger>
                  <TabsTrigger value="developer" className="py-3 text-sm sm:text-base" onClick={() => location.pathname === '/' && document.getElementById('developer')?.scrollIntoView({behavior: 'smooth'})}><Code className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />Developer</TabsTrigger>
                  <TabsTrigger value="credits" className="py-3 text-sm sm:text-base" onClick={() => location.pathname === '/' && document.getElementById('credits')?.scrollIntoView({behavior: 'smooth'})}><Award className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />Credits</TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="why-hyde">
              <AnimatedSectionWrapper id="why-hyde" className="!pt-12">
                <h2 className="text-center mb-10">Why This Project?</h2>
                <AnimatedCard delay={0.1}>
                  <Card className="glassmorphism-card">
                    <CardContent className="p-6 md:p-8 text-lg leading-relaxed">
                      <p className="mb-4">
                        This project is inspired by the groundbreaking research paper <a href="https://arxiv.org/abs/2212.10496" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-semibold">"Precise Zero-Shot Dense Retrieval without Relevance Labels"</a>. It introduces Hypothetical Document Embeddings (HyDE), a novel technique that significantly improves zero-shot dense retrieval in Natural Language Processing (NLP).
                      </p>
                      <p className="mb-4">
                        Traditional search and retrieval systems often rely heavily on large amounts of labeled data, which can be expensive and time-consuming to acquire. HyDE addresses this challenge by generating "hypothetical" documents based on a user's query using a Large Language Model (LLM). These hypothetical documents, though not real, capture the essence of what an ideal answer might look like.
                      </p>
                      <p className="mb-4">
                        Embeddings (numerical representations) are then created from these hypothetical documents. These embeddings are used to search a corpus of actual documents, allowing the system to find relevant information with high accuracy, even without prior specific training on that query type or domain (hence "zero-shot").
                      </p>
                      <p>
                        The core innovation lies in bridging the gap between the query and the documents through these LLM-generated intermediaries. This approach has demonstrated substantial improvements in retrieval performance, making it a powerful tool for applications like search engines, question-answering systems, and chatbots, especially in scenarios where labeled data is scarce. This project aims to explore and implement this cutting-edge technique in a practical web application.
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </AnimatedSectionWrapper>
            </TabsContent>

            <TabsContent value="concepts">
              <AnimatedSectionWrapper id="concepts" className="!pt-12">
                <h2 className="text-center mb-10">Key Concepts</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {concepts.map((concept, index) => (
                    <AnimatedCard key={concept.name} delay={index * 0.1}>
                      <Card className="h-full glassmorphism-card hover:shadow-primary/30 hover:shadow-lg transition-all duration-300">
                        <CardHeader className="items-center text-center">
                          {concept.icon}
                          <CardTitle className="text-xl">{concept.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground text-sm text-center">{concept.description}</p>
                        </CardContent>
                      </Card>
                    </AnimatedCard>
                  ))}
                </div>
              </AnimatedSectionWrapper>
            </TabsContent>

            <TabsContent value="developer">
              <AnimatedSectionWrapper id="developer" className="!pt-12">
                <h2 className="text-center mb-10">Developer Portfolio</h2>
                <AnimatedCard delay={0.1}>
                  <Card className="max-w-2xl mx-auto glassmorphism-card">
                    <CardHeader className="text-center pt-8">
                      <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 120 }}
                        className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
                      >
                        <Code className="w-12 h-12 text-primary-foreground" />
                      </motion.div>
                      <CardTitle className="text-3xl">Sampark Bhol</CardTitle>
                      <CardDescription className="text-md">AI & NLP Enthusiast | Software Developer | Research Enthusiast</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pb-8">
                      <p className="text-center text-muted-foreground px-4">
                        Passionate about leveraging cutting-edge AI to solve real-world problems. Experienced in developing NLP applications, exploring efficient machine learning models, and contributing to impactful research.
                      </p>
                      <div className="flex justify-center space-x-4">
                        <Button asChild variant="outline" className="hover:bg-primary/10 hover:border-primary transition-all">
                          <a href="https://linkedin.com/in/sampark-bhol" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
                          </a>
                        </Button>
                        <Button asChild variant="outline" className="hover:bg-primary/10 hover:border-primary transition-all">
                          <a href="https://tinyurl.com/yc33cawk" target="_blank" rel="noopener noreferrer">
                            <FileText className="mr-2 h-5 w-5" /> Research Paper
                          </a>
                        </Button>
                      </div>
                      <div className="pt-4 px-4">
                        <h3 className="text-xl font-semibold mb-3 text-center text-primary">Featured Research</h3>
                        <AnimatedCard delay={0.3}>
                          <div className="p-4 border border-dashed border-accent/50 rounded-lg bg-accent/5 hover:shadow-md transition-shadow">
                            <p className="font-semibold text-accent">An Energy Efficient Hybrid Communication Protocol for Large Area Wireless Sensor Networks</p>
                            <p className="text-sm text-muted-foreground italic mt-1">Published in Elsevier Procedia Computer Science (ICECMSN).</p>
                            <p className="text-sm mt-2">
                              This research focuses on optimizing wireless communication algorithms and enhancing system efficiency for large-scale sensor network deployments, contributing to sustainable and robust IoT solutions.
                            </p>
                          </div>
                        </AnimatedCard>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              </AnimatedSectionWrapper>
            </TabsContent>

            <TabsContent value="credits">
              <AnimatedSectionWrapper id="credits" className="!pt-12">
                <h2 className="text-center mb-10">Credits & Acknowledgements</h2>
                <div className="max-w-3xl mx-auto space-y-8">
                  {researchPapers.map((paper, index) => (
                    <AnimatedCard key={paper.title} delay={index * 0.15}>
                      <Card className="glassmorphism-card">
                        <CardHeader>
                          <CardTitle className="text-2xl text-center text-primary">{paper.title}</CardTitle>
                          {paper.authors !== "Conceptual - Illustrative Example" && 
                            <CardDescription className="text-sm text-center text-muted-foreground mt-1">
                              Authors: {paper.authors}
                            </CardDescription>
                          }
                        </CardHeader>
                        <CardContent className="text-md leading-relaxed">
                          <p className="mb-3">{paper.description}</p>
                          {paper.link !== "#" && (
                            <div className="text-center">
                              <Button asChild variant="link" className="text-accent hover:text-accent/80">
                                <a href={paper.link} target="_blank" rel="noopener noreferrer">
                                  {paper.link.includes("arxiv.org") ? "View on arXiv" : "Learn More"} <ArrowRight className="ml-1 h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </AnimatedCard>
                  ))}
                </div>
                <AnimatedCard delay={researchPapers.length * 0.15 + 0.1}>
                  <p className="mt-8 text-center text-sm text-muted-foreground">
                    All AI-driven functionalities in this web application (such as LLM interactions, embedding generation, and vector search) are simulated for frontend demonstration purposes and to illustrate the HyDE workflow.
                  </p>
                </AnimatedCard>
              </AnimatedSectionWrapper>
            </TabsContent>
          </Tabs>
        </div>
      );
    };

    export default HomePage;