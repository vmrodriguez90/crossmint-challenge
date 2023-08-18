# Megaverse Challenge Solution

## Introduction

Hello! I'm Victor Manuel Rodriguez from Argentina, and this is my solution for the Megaverse Challenge. In this README, I'll provide an overview of my approach and the key features of the React App I developed.

## About the App

I decided to create a React App for the Megaverse Challenge to combine the explanations with interactive features. This way, anyone interested can not only understand the challenge but also see it in action with the help of buttons.

## Features

### Initial Map Rendering

Upon launching the app, the initial map is rendered exactly as downloaded from the goal. This provides a clear starting point to see the original state of the challenge.

### Design Patterns and MVC

Throughout the development process, I made use of various design patterns to enhance code organization and maintainability. Additionally, I structured the app following the Model-View-Controller (MVC) architecture, which helps separate concerns and improve code readability.

### Sequential Submission

To ensure that the server isn't overloaded with multiple simultaneous requests, I implemented a sequential submission mechanism. The app submits one request to the server approximately every second. This sequential submission prevents overwhelming the server and provides a smoother experience for both the user and the system.

### Retry Mechanism

In the event of a failed request, I integrated a retry mechanism that allows the app to resubmit the failed requests. This approach ensures that important data isn't lost due to temporary issues.

## Getting Started

To run the app locally, follow these steps:

1. Clone this repository.
2. Navigate to the project directory.
3. Install the necessary dependencies using `npm install`.
4. Start the development server with `npm start`.

## Conclusion

I hope you find my solution insightful and engaging. Feel free to explore the codebase and run the app to see the Megaverse Challenge in action. If you have any questions or suggestions, please don't hesitate to reach out.

Happy coding!

**Parkour to the moon!**


Victor Manuel Rodriguez
