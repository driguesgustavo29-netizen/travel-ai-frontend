import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('deve renderizar o label', () => {
    render(<Input label="Email" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro', () => {
    render(<Input label="Email" error="Campo obrigatorio" />);
    expect(screen.getByText('Campo obrigatorio')).toBeInTheDocument();
  });

  it('deve aceitar input do usuario', async () => {
    render(<Input label="Nome" />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Gustavo');
    expect(input).toHaveValue('Gustavo');
  });
});
