import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Security from './Security';

describe('Security page CTA', () => {
  it('routes the Contact Me button to the contact page', () => {
    render(
      <MemoryRouter>
        <Security />
      </MemoryRouter>,
    );

    const contactLink = screen.getByRole('link', { name: /contact me/i });
    expect(contactLink).toHaveAttribute('href', '/contact');
  });
});
