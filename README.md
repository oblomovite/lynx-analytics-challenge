# Usage 
To run the app open a terminal and cd into the project directory and run `npm start`
## Design
### State
Due to time and scope constraints I decided to use simple useState hooks in React to track application state changes. `useReducer` or `React.Context` could have been used as well but given the simplicity of component architecture I opted for I felt it would be unecessisary.
### Component Design and Architecture
I made the decision to fold all the code into one component to save time. For a larger project I always prefer to spend more time breaking up and compartmentalizing the application so that components can be reused and reduce verbosity. Generally I would have preferred to separate the chart rendering and form and its related logic and nest them inside a stateful component but to save on time I put everything together.
### Recharts
I chose Recharts over D3 because Recharts seems to have better integration with React. It's less code to write the same charts. Further, d3-react-components seems to be abandoned or at least lacking maintainers.
### CSS
I chose tailwindcss because it's really popular and there's lots of references for easy bootstrap style css.
## Considerations
### Testing
I would have liked add some function tests to simulate user interaction with React Testing Library but I wanted to maximize my time spent on the core application
### Validation
I added the `required` tag to each input but a more precise tooltip than the stock 'field required' would have been nice to add
### Styling, Design and Usability
I could have spent more time making it feel more like a dashboard. I wasn't sure the exact requirements were for the project in terms of design so I sort went with what I thought would be a meaningful use case, that is -- querying data from an API and Charting them as needed, but I needed to spend more time on design to make it prettier and more like a dashboard.
## Improvements
### Design
If I had more time I would have liked to have the charts be persisted in state and new ones could be added along side previous ones. I specifically chose not to have the charts build for each of the metrics because I thought allowing the user to be able to apply multiple metrics on the same chart would be more interesting.  