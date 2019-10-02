import createHistory from 'history/createBrowserHistory';
import createTestHistory from 'history/createMemoryHistory';

export default process.env.BABEL_ENV === 'test' ? createTestHistory() : createHistory();
