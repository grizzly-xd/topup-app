import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransactionStatusBadge } from '@/components/TransactionStatusBadge';

describe('TransactionStatusBadge', () => {
  it('renders success label', () => {
    render(<TransactionStatusBadge status="SUCCESS" />);
    expect(screen.getByText('Berhasil')).toBeInTheDocument();
  });
  it('renders pending label', () => {
    render(<TransactionStatusBadge status="PENDING" />);
    expect(screen.getByText('Menunggu Pembayaran')).toBeInTheDocument();
  });
  it('renders failed label', () => {
    render(<TransactionStatusBadge status="FAILED" />);
    expect(screen.getByText('Gagal')).toBeInTheDocument();
  });
});
