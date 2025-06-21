'use client';

import { Plus } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { testimonials } from '@/data/testimonials';
import Header from '@/components/shared/Header';
import Navbar from '@/components/shared/Navbar';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handlePlusClick = () => {
    router.push('/ai-learning-off');
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <ScrollArea className="h-screen">
        <div className="pb-20">
          <Header />
          
          <div className="px-6">
            {/* Main CTA Card */}
            <Card className="bg-primary border-0 rounded-3xl p-8 mb-12 relative overflow-hidden">
              <div className="relative z-10">
                <h1 className="text-4xl font-pixel font-bold mb-6 leading-tight text-foreground">
                  Try it<br />
                  on your<br />
                  art
                </h1>
                <p className="text-lg mb-8 opacity-90 text-foreground font-sans">
                  Upload your work to keep it safe<br />
                  from AI training.
                </p>
                <Button 
                  size="lg" 
                  onClick={handlePlusClick}
                  className="bg-black hover:bg-secondary text-foreground rounded-full w-16 h-16 p-0 absolute bottom-8 right-8 border-0"
                >
                  <Plus size={24} weight="bold" />
                </Button>
              </div>
            </Card>

            {/* Why Artists Choose Us Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-sans font-bold mb-6 text-foreground">Why Artists Choose Us</h2>
              <ScrollArea className="w-full">
                <div className="flex gap-4 pb-4">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="bg-secondary border-border rounded-2xl p-6 min-w-[280px] flex-shrink-0">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="w-16 h-16 mb-4">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className="bg-muted text-foreground">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-sans font-semibold mb-2 text-muted-foreground">{testimonial.name}</h3>
                        <p className="text-foreground leading-relaxed font-sans">{testimonial.quote}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </ScrollArea>

      <Navbar />
    </div>
  );
}