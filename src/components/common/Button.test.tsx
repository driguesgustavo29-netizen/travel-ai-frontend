import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('deve renderizar o texto do filho', () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByText('Clique aqui')).toBeInTheDocument();
  });

  it('deve chamar onClick quando clicado', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clique</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('deve exibir "Carregando..." quando loading=true', () => {
    render(<Button loading>Enviar</Button>);
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('deve ficar desabilitado quando loading=true', () => {
    render(<Button loading>Enviar</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
