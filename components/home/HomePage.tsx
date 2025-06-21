'use client';

import { Plus, House, Broadcast, CreditCard, User } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { testimonials } from '@/data/testimonials';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <ScrollArea className="h-screen">
        <div className="pb-20">
          {/* Header */}
          <div className="px-6 py-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <div className="w-6 h-6 bg-foreground rounded-sm flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary rounded-sm"></div>
                </div>
              </div>
              <span className="text-xl font-pixel font-bold tracking-wide">artnest</span>
            </div>

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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex justify-around items-center py-3">
          <div className="flex flex-col items-center gap-1">
            <House size={24} weight="fill" className="text-primary" />
            <span className="text-xs text-primary font-medium font-pixel">ArtNest</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Broadcast size={24} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground"></span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <CreditCard size={24} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground"></span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <User size={24} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground"></span>
          </div>
        </div>
      </div>
    </div>
  );
}