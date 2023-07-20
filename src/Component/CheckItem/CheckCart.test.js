import { render,screen ,cleanup} from '@testing-library/react';
import CheckCart from './CheckCart';

test('should render checkCart Component', () =>{
render(<CheckCart/>);
const checkCartElement =screen.getByTestId('test-1');
expect(checkCartElement).toBeInTheDocument();
expect(checkCartElement).toHaveTextContent('cart Item')

})
