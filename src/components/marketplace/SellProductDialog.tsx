import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { MarketplaceProduct } from '@/types/marketplace';

const sellProductSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().min(10, 'Description trop courte (min. 10 caractères)'),
  price: z.coerce.number().min(0.01, 'Le prix doit être positif'),
  category: z.string().min(1, 'La catégorie est requise'),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

interface SellProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<MarketplaceProduct, 'id' | 'rating' | 'seller' | 'inStock'>) => void;
}

const SellProductDialog: React.FC<SellProductDialogProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [tags, setTags] = React.useState<string[]>([]);
  const [currentTag, setCurrentTag] = React.useState('');

  const form = useForm<z.infer<typeof sellProductSchema>>({
    resolver: zodResolver(sellProductSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      category: '',
      image: '/placeholder.svg',
      tags: [],
    },
  });

  const categories = [
    { value: 'semences', label: 'Semences' },
    { value: 'engrais', label: 'Engrais' },
    { value: 'equipement', label: 'Équipement' },
    { value: 'irrigation', label: 'Irrigation' },
    { value: 'protection', label: 'Protection des cultures' },
    { value: 'outils', label: 'Outils' },
    { value: 'autres', label: 'Autres' },
  ];

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      const newTags = [...tags, currentTag.trim()];
      setTags(newTags);
      form.setValue('tags', newTags);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    form.setValue('tags', newTags);
  };

  const handleFormSubmit = (values: z.infer<typeof sellProductSchema>) => {
    onSubmit({
      title: values.title,
      description: values.description,
      price: values.price,
      category: values.category,
      image: values.image || '/placeholder.svg',
      tags: tags,
    });
    form.reset();
    setTags([]);
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Vendre un produit</DialogTitle>
          <DialogDescription>
            Créez une annonce pour votre produit agricole
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre du produit</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Semences de blé premium" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix (€)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        placeholder="0.00" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez votre produit en détail..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <FormLabel>Tags (mots-clés)</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="Ajouter un tag"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button type="button" variant="outline" onClick={addTag}>
                  Ajouter
                </Button>
              </div>
              
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit" className="bg-plantera-blue hover:bg-plantera-blue/90">
                Publier l'annonce
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SellProductDialog;