# Stratus 2025 AI Hackathon

This is my project for the Stratus 2025 AI Hackathon, A-EYE - experimental feature playground for testing AI with images.

## Project Installation

- clone repository
- run `pnpm install` to install dependencies
- Generate a [Google Gemini API key](https://aistudio.google.com/app/apikey) and store it as `GEMINI_API_KEY` in `.env`
- run `pnpm dev` to launch project

## Project Features
- Part Identificatation
  - Able to identify wide variety of objects without any additional training.
  - Training with real world data may improve results further.
  - Able to look up dimensions on known objects, but provides estimations for unknown objects.
- Document Scanning
  - Able to transcribe text from physical objects without any extra libraries for OCR.
  - Response can be returned in markdown, to give more formatting to scanned documents.
- Diagram Generation
  - Able to generate response based on the content of a photo.

## Project Information

- Goal: Experiment utilizing AI to extract and analyze information from images.
- AI Model: [Google Gemini](https://aistudio.google.com/)
- Total Cost: Google Gemini Free Tier - $0.00
- Frameworks used: [Astro](https://astro.build/), [Vue](https://vuejs.org/)
- Hosting: [Netlify](https://netlify.com/)
- Created by: [Ryan Trimble](https://ryantrimble.com/)