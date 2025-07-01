/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type React from "react";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, User, MessageSquare, Send, CheckCircle } from "lucide-react";
import { ContactForm } from "../actions/contact";

export default function Component() {
  const [state, action, isPending] = useActionState(ContactForm, null);

  return (
    <div className=" flex items-center justify-center">
      <Card className="w-full max-w-lg relative backdrop-blur-lg bg-white/10 border-blue-200 shadow-2xl mt-0 md:mt-10">
        <CardContent className=" p-4 md:p-8">
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold  mb-2">Get In Touch</h1>
              <p className="/70">{"Let's start a conversation"}</p>
            </div>

            <form className="space-y-6" action={action}>
              <div className="space-y-2">
                <Label htmlFor="name" className="/90 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  className="bg-white/10 border-blue-200   placeholder:/50 focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                  placeholder="Your full name"
                />

                {state?.errors?.name && (
                  <p className=" text-red-500 text-xs">{state?.errors?.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="/90 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="bg-white/10 border-blue-200   placeholder:/50 focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                  placeholder="your.email@example.com"
                />

                {state?.errors?.email && (
                  <p className=" text-red-500 text-xs">
                    {state?.errors?.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="subject"
                  className="/90 flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  className="bg-white/10 border-blue-200   placeholder:/50 focus:bg-white/20 focus:border-white/40 transition-all duration-300"
                  placeholder="What's this about?"
                />

                {state?.errors?.subject && (
                  <p className=" text-red-500 text-xs">
                    {state?.errors?.subject}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="/90">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  className="bg-white/10 border-blue-200  placeholder:/50 outline-none focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all duration-300 min-h-[120px] resize-none"
                  placeholder="Tell us more about your project or inquiry..."
                />

                {state?.errors?.message && (
                  <p className=" text-red-500 text-xs">
                    {state?.errors?.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full text-white bg-purple-500  font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg group cursor-pointer"
                disabled={isPending}
              >
                <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                Send Message
              </Button>
            </form>
          </>

          {/* <div className="text-center py-8">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto animate-bounce" />
              </div>
              <h2 className="text-2xl font-bold  mb-2">Message Sent!</h2>
              <p className="/70">
                {"Thanks for reaching out. We'll get back to you soon."}
              </p>
            </div> */}
        </CardContent>
      </Card>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
