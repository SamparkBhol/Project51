import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { UploadCloud, FileText, Trash2, PlusCircle } from 'lucide-react';
    import { cn } from '@/lib/utils';

    const DatasetPage = () => {
      const { toast } = useToast();
      const [selectedFile, setSelectedFile] = useState(null);
      const [uploading, setUploading] = useState(false);
      const [datasets, setDatasets] = useState([
        { id: 'wiki2023', name: 'Wikipedia Dump (2023)', size: '15.2 GB', type: 'XML Dump', status: 'Indexed' },
        { id: 'arxivNLP', name: 'ArXiv NLP Papers', size: '2.5 GB', type: 'PDF Collection', status: 'Processing' },
      ]);

      const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          setSelectedFile(event.target.files[0]);
        }
      };

      const handleUpload = async () => {
        if (!selectedFile) {
          toast({
            title: 'No file selected',
            description: 'Please select a file to upload.',
            variant: 'destructive',
          });
          return;
        }
        setUploading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const newDataset = {
          id: `custom-${Date.now()}`,
          name: selectedFile.name,
          size: `${(selectedFile.size / (1024*1024)).toFixed(2)} MB`,
          type: selectedFile.type || 'Unknown',
          status: 'Pending Indexing'
        };
        setDatasets(prev => [newDataset, ...prev]);
        
        toast({
          title: 'Upload Successful (Simulated)',
          description: `${selectedFile.name} has been uploaded and is pending indexing.`,
        });
        setSelectedFile(null);
        if (document.getElementById('dataset-upload-input')) {
          document.getElementById('dataset-upload-input').value = '';
        }
        setUploading(false);
      };

      const handleDeleteDataset = (datasetId) => {
        toast({
          title: 'Dataset Deleted (Simulated)',
          description: `Dataset ${datasets.find(d => d.id === datasetId)?.name} has been removed.`,
        });
        setDatasets(prev => prev.filter(d => d.id !== datasetId));
      };

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto py-28 px-4 min-h-screen"
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
                  Manage Datasets
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Upload and manage your custom datasets for retrieval.
              </p>
            </motion.div>

            <Card className="mb-10 glassmorphism-card">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <UploadCloud className="mr-3 h-7 w-7 text-primary" />
                  Upload New Dataset
                </CardTitle>
                <CardDescription>
                  Upload your own datasets (e.g., PDFs, CSV files, text documents) to serve as the retrieval corpus.
                  <br/>
                  <span className="text-xs text-muted-foreground/80">(Functionality is simulated for frontend demonstration)</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input 
                    id="dataset-upload-input"
                    type="file" 
                    onChange={handleFileChange} 
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    disabled={uploading}
                  />
                  {selectedFile && <p className="text-sm text-muted-foreground mt-2">Selected: {selectedFile.name}</p>}
                </div>
                <Button onClick={handleUpload} disabled={uploading || !selectedFile} className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  {uploading ? 'Uploading...' : 'Upload Dataset'}
                </Button>
              </CardContent>
            </Card>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-3xl font-semibold mb-6 text-center sm:text-left">Available Datasets</h2>
              {datasets.length > 0 ? (
                <div className="space-y-4">
                  {datasets.map((dataset, index) => (
                    <motion.div
                      key={dataset.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.4, duration: 0.4 }}
                    >
                      <Card className="hover:shadow-lg transition-shadow glassmorphism-card">
                        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                          <div className="flex items-center mb-3 sm:mb-0">
                            <FileText className="h-8 w-8 text-accent mr-4 shrink-0" />
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">{dataset.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                Size: {dataset.size} | Type: {dataset.type} | Status: <span className={cn(dataset.status === 'Indexed' ? 'text-green-400' : dataset.status === 'Processing' ? 'text-yellow-400' : 'text-orange-400')}>{dataset.status}</span>
                              </p>
                            </div>
                          </div>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteDataset(dataset.id)}>
                            <Trash2 className="h-4 w-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Delete</span>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No datasets available. Upload one to get started!</p>
              )}
            </motion.div>
          </div>
        </motion.div>
      );
    };

    export default DatasetPage;