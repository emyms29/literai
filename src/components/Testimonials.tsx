import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "LiterAI has transformed how my students engage with reading. The AI-powered stories keep them excited about learning!",
    author: "Sarah Johnson",
    role: "3rd Grade Teacher",
  },
  {
    quote: "My daughter's reading skills have improved dramatically since using LiterAI. She loves the interactive characters!",
    author: "Michael Chen",
    role: "Parent",
  },
  {
    quote: "As a special education teacher, I appreciate how LiterAI adapts to each student's unique learning needs.",
    author: "Emily Rodriguez",
    role: "Special Education Teacher",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What People Say</h2>
          <p className="text-xl text-gray-600">Hear from educators and parents using LiterAI</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 