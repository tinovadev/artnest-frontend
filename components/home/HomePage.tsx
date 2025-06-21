'use client';

import { Plus } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { testimonials } from '@/data/testimonials';
import Header from '@/components/shared/Header';
import Navbar from '@/components/shared/Navbar';
import TopNavbar from '@/components/shared/TopNavbar';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handlePlusClick = () => {
    router.push('/ai-learning-off');
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <TopNavbar />
      
      <ScrollArea className="h-screen">
        <div className="pb-20 lg:pb-8 lg:pt-20">
          <div className="lg:hidden">
            <Header />
          </div>
          
          <div className="px-6 lg:px-12 max-w-7xl mx-auto">
            {/* Main Content - Responsive Layout */}
            <div className="lg:flex lg:gap-12 lg:items-start">
              {/* Main CTA Card */}
              <div className="lg:flex-1 lg:max-w-2xl">
                <Card className="bg-primary border-0 rounded-3xl p-8 lg:p-12 mb-12 lg:mb-0 relative overflow-hidden">
                  <div className="relative z-10">
                    <h1 className="text-4xl lg:text-6xl font-pixel font-bold mb-6 leading-tight text-foreground">
                      Try it<br />
                      on your<br />
                      art
                    </h1>
                    <p className="text-lg lg:text-xl mb-8 opacity-90 text-foreground font-sans">
                      Upload your work to keep it safe<br />
                      from AI training.
                    </p>
                    <Button 
                      size="lg" 
                      onClick={handlePlusClick}
                      className="bg-black hover:bg-secondary text-foreground rounded-full w-16 h-16 lg:w-20 lg:h-20 p-0 absolute bottom-8 right-8 border-0"
                    >
                      <Plus size={24} weight="bold" />
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Why Artists Choose Us Section */}
              <div className="lg:flex-1 lg:max-w-xl">
                <h2 className="text-2xl lg:text-3xl font-sans font-bold mb-6 text-foreground">Why Artists Choose Us</h2>
                <div className="space-y-4 lg:space-y-6">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="bg-secondary border-border rounded-2xl p-6 lg:p-8">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12 lg:w-16 lg:h-16 flex-shrink-0">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className="bg-muted text-foreground">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-sans font-semibold mb-2 text-muted-foreground text-sm lg:text-base">{testimonial.name}</h3>
                          <p className="text-foreground leading-relaxed font-sans text-base lg:text-lg">{testimonial.quote}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      <Navbar />
    </div>
  );
}