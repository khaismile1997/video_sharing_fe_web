import { render, screen } from '@testing-library/react'
import Auth from '../view/auth';

test("Example 1 renders successfully", () => {
    render(<Auth/>);
    const element = screen.getByText(/first test/i);
    expect(element).toBeInTheDocument();
})