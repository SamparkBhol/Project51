import React, { useState, useEffect } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
    import { Label } from '@/components/ui/label';
    import { Textarea } from '@/components/ui/textarea';
    import { Progress } from '@/components/ui/progress';
    import { useToast } from '@/components/ui/use-toast';
    import { Search, Lightbulb, FileText, AlertTriangle } from 'lucide-react';

    const HyDESearchPage = () => {
      const [query, setQuery] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [hypotheticalDocs, setHypotheticalDocs] = useState([]);
      const [retrievedDocs, setRetrievedDocs] = useState([]);
      const [progress, setProgressValue] = useState(0);
      const { toast } = useToast();

      const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) {
          toast({
            title: 'Empty Query',
            description: 'Please enter a search query.',
            variant: 'destructive',
          });
          return;
        }

        setIsLoading(true);
        setProgressValue(0);
        setHypotheticalDocs([]);
        setRetrievedDocs([]);

        
        setProgressValue(20);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const hypos = [
          `Hypothetical document 1 for query: "${query}". This document explores various aspects and provides detailed insights.`,
          `Another hypothetical exploration based on "${query}", focusing on related concepts and potential outcomes.`,
        ];
        setHypotheticalDocs(hypos.map((doc, i) => ({ id: `hypo-${i}`, content: doc, score: Math.random() * 0.2 + 0.8 })));
        setProgressValue(50);
        toast({
          title: 'Hypothetical Docs Generated (Simulated)',
          description: 'LLM successfully generated hypothetical documents.',
        });
        
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        const results = [
          { id: 'res-1', title: 'Relevant Document A', snippet: `This document directly addresses key aspects of "${query}"...`, score: Math.random() * 0.3 + 0.7, source: 'Wikipedia Corpus' },
          { id: 'res-2', title: 'Related Study B', snippet: `An in-depth study that touches upon themes related to "${query}"...`, score: Math.random() * 0.3 + 0.6, source: 'Academic Papers DB' },
          { id: 'res-3', title: 'Blog Post C', snippet: `A practical guide and discussion surrounding "${query}"...`, score: Math.random() * 0.3 + 0.5, source: 'Web Crawl Data' },
        ];
        setRetrievedDocs(results.sort((a,b) => b.score - a.score));
        setProgressValue(100);
        toast({
          title: 'Search Complete! (Simulated)',
          description: 'Relevant documents retrieved successfully.',
          variant: 'default',
        });

        setIsLoading(false);
      };
      
      useEffect(() => {
        let timer;
        if (isLoading && progress < 100) {
           timer = setTimeout(() => {
            setProgressValue(prev => Math.min(prev + 5, 100) );
          }, 150);
        }
        return () => clearTimeout(timer);
      }, [progress, isLoading]);

      const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.1,
            duration: 0.3,
          },
        }),
      };

      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-28 px-4 min-h-screen"
        >
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
                  HyDE Search
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Leverage Hypothetical Document Embeddings for Zero-Shot Dense Retrieval.
              </p>
            </motion.div>

            <form onSubmit={handleSearch} className="mb-12">
              <Card className="p-6 glassmorphism-card">
                <Label htmlFor="search-query" className="text-lg font-semibold mb-2 block">Enter your query:</Label>
                <div className="flex space-x-2">
                  <Input
                    id="search-query"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g., What are the best practices for reducing carbon emissions?"
                    className="flex-grow text-base"
                    disabled={isLoading}
                  />
                  <Button type="submit" size="lg" disabled={isLoading} className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 transform hover:scale-105">
                    <Search className="mr-2 h-5 w-5" />
                    {isLoading ? 'Searching...' : 'Search'}
                  </Button>
                </div>
                {isLoading && (
                  <div className="mt-4">
                    <Progress value={progress} className="w-full h-3" />
                    <p className="text-sm text-muted-foreground mt-1 text-center">Processing... {progress}%</p>
                  </div>
                )}
              </Card>
            </form>

            {(hypotheticalDocs.length > 0 || retrievedDocs.length > 0) && (
              <Tabs defaultValue="retrieved" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="retrieved" className="py-3 text-base">
                    <FileText className="mr-2 h-5 w-5" /> Retrieved Documents
                  </TabsTrigger>
                  <TabsTrigger value="hypothetical" className="py-3 text-base">
                    <Lightbulb className="mr-2 h-5 w-5" /> Hypothetical Documents
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="retrieved">
                  <AnimatePresence>
                    {retrievedDocs.length > 0 ? (
                      <motion.div className="space-y-6">
                        {retrievedDocs.map((doc, index) => (
                          <motion.div
                            key={doc.id}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={cardVariants}
                            layout
                          >
                            <Card className="glassmorphism-card">
                              <CardHeader>
                                <CardTitle className="text-xl text-primary">{doc.title}</CardTitle>
                                <CardDescription>Source: {doc.source} | Relevance: {(doc.score * 100).toFixed(1)}%</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <p className="text-muted-foreground">{doc.snippet}</p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      !isLoading && <p className="text-center text-muted-foreground py-8">No documents retrieved for this query.</p>
                    )}
                  </AnimatePresence>
                </TabsContent>
                <TabsContent value="hypothetical">
                  <AnimatePresence>
                    {hypotheticalDocs.length > 0 ? (
                      <motion.div className="space-y-6">
                        {hypotheticalDocs.map((doc, index) => (
                          <motion.div
                            key={doc.id}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={cardVariants}
                            layout
                          >
                            <Card className="glassmorphism-card">
                              <CardHeader>
                                <CardTitle className="text-xl text-accent">Hypothetical Document {index + 1}</CardTitle>
                                <CardDescription>Generated Confidence: {(doc.score * 100).toFixed(1)}%</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <Textarea value={doc.content} readOnly rows={4} className="bg-muted/30 border-muted/50" />
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      !isLoading && <p className="text-center text-muted-foreground py-8">No hypothetical documents generated yet.</p>
                    )}
                  </AnimatePresence>
                </TabsContent>
              </Tabs>
            )}
            {!isLoading && query && hypotheticalDocs.length === 0 && retrievedDocs.length === 0 && (
              <Card className="mt-12 glassmorphism-card">
                <CardContent className="p-8 text-center">
                  <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
                  <p className="text-muted-foreground">
                    We couldn't find any documents matching your query "{query}". 
                    Try rephrasing your query or using different keywords.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>
      );
    };

    export default HyDESearchPage;