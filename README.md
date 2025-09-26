# Computer Functional Cycle Simulator

An interactive educational tool to visualize and understand the computer's functional cycle (Input, Processing, Storage, Output) for various peripheral devices.

This simulation provides a visual guide to how different computer components work together to perform common tasks, such as writing a document, playing a game, or browsing the internet.

## Features

-   **Interactive Scenarios:** Choose from a variety of common computer tasks.
-   **Visual Simulation:** Watch the data flow from input devices, through processing and storage, to output devices.
-   **Dynamic Animations:** Engaging animations highlight the active components and data pathways at each step.
-   **Educational Descriptions:** Clear, concise explanations for each stage of the cycle.
-   **No Build Step Required:** Runs directly in the browser, using Babel to transpile code on-the-fly.

## Local Setup

To run this project on your local machine, you'll need a simple local web server. The easiest way to do this is using `npx`, which is included with Node.js.

### Prerequisites

-   [Node.js](https://nodejs.org/) (which includes `npm` and `npx`) installed on your computer.

### Running the Application

1.  **Download the Files:** Make sure you have all the project files (`index.html`, `index.tsx`, `App.tsx`, etc.) in a single folder on your computer.

2.  **Open a Terminal:** Navigate to the project folder using your terminal or command prompt.
    ```bash
    cd path/to/your/project-folder
    ```

3.  **Start a Local Server:** Run the following command in your terminal. This will start a web server and make the application available in your browser.
    ```bash
    npx serve
    ```

4.  **View in Browser:** The terminal will output a local URL, usually `http://localhost:3000`. Open this URL in your web browser to view and interact with the application.

That's it! The simulator should now be running locally.

## How to Use

1.  Open the application in your browser.
2.  Select a scenario from the dropdown menu (e.g., "Écrire un texte").
3.  Click the "Démarrer la simulation" button.
4.  Watch as the simulation progresses through the Input, Processing, Storage, and Output stages.
5.  Once finished, you can choose another simulation to run.