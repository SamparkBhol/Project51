import React from 'react';
    import { motion } from 'framer-motion';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
    import { BarChart3, Percent, ListChecks, AlertCircle } from 'lucide-react';

    const mockMetrics = [
      { id: 'recall', title: 'Recall@5', value: '78%', icon: BarChart3, description: 'Percentage of relevant documents retrieved in top 5.', colorClass: 'text-primary' },
      { id: 'precision', title: 'Precision@5', value: '65%', icon: Percent, description: 'Percentage of retrieved top 5 documents that are relevant.', colorClass: 'text-accent' },
      { id: 'mrr', title: 'Mean Reciprocal Rank (MRR)', value: '0.72', icon: ListChecks, description: 'Average reciprocal rank of the first relevant document.', colorClass: 'text-secondary' },
    ];

    const DashboardPage = () => {
      const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i) => ({
          opacity: 1,
          scale: 1,
          transition: {
            delay: i * 0.15 + 0.2, 
            duration: 0.4,
            ease: "easeOut"
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
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
                  Performance Dashboard
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Visualize key performance metrics for your HyDE system. (Simulated Data)
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {mockMetrics.map((metric, index) => (
                <motion.div
                  key={metric.id}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Card className="h-full hover:shadow-xl transition-shadow duration-300 glassmorphism-card">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-lg font-medium">{metric.title}</CardTitle>
                      <metric.icon className={`h-6 w-6 ${metric.colorClass}`} />
                    </CardHeader>
                    <CardContent>
                      <div className={`text-4xl font-bold ${metric.colorClass}`}>{metric.value}</div>
                      <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Card className="glassmorphism-card">
                <CardHeader>
                  <CardTitle className="text-2xl">Detailed Analytics (Placeholder)</CardTitle>
                  <CardDescription>
                    This section would typically display charts and graphs for query performance over time, dataset impact, etc.
                    <br/>
                    <span className="text-xs text-muted-foreground/80">(Functionality is conceptual for frontend demonstration)</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-96 flex flex-col items-center justify-center text-muted-foreground bg-muted/30 rounded-b-lg">
                  <AlertCircle className="h-16 w-16 mb-4 text-primary/50" />
                  <p className="text-xl font-semibold">Advanced Visualizations Coming Soon</p>
                  <p>Imagine beautiful charts here showcasing retrieval effectiveness!</p>
                  <div className="mt-6 w-full max-w-md space-y-3">
                    <div className="h-8 bg-primary/20 rounded animate-pulse"></div>
                    <div className="h-8 bg-accent/20 rounded animate-pulse w-5/6 mx-auto"></div>
                    <div className="h-8 bg-secondary/20 rounded animate-pulse w-4/6 mx-auto"></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      );
    };

    export default DashboardPage;