import { describe, it, expect } from 'vitest';

// Simulating the state machine transitions logically since we don't have
// a live DB or full backend service to test against yet.
// These reflect the requirements defined in Section 4.1 of the SRS.

enum InvoiceStatus {
  UNPAID = "UNPAID",
  IN_REVIEW = "IN_REVIEW",
  CONFIRMED = "CONFIRMED",
  REJECTED = "REJECTED",
  DISPUTED = "DISPUTED",
  WAIVED = "WAIVED"
}

interface Invoice {
  id: string;
  status: InvoiceStatus;
  expected_amount: number;
  claimed_amount: number | null;
  verified_amount: number | null;
}

// Business Logic Functions based on SRS
function submitPaymentProof(invoice: Invoice, claimedAmount: number): Invoice {
  if (invoice.status !== InvoiceStatus.UNPAID && invoice.status !== InvoiceStatus.REJECTED) {
    throw new Error("Invalid state transition: can only submit proof for UNPAID or REJECTED invoices");
  }
  return {
    ...invoice,
    status: InvoiceStatus.IN_REVIEW,
    claimed_amount: claimedAmount
  };
}

function confirmPayment(invoice: Invoice): Invoice {
  if (invoice.status !== InvoiceStatus.IN_REVIEW) {
    throw new Error("Invalid state transition: can only confirm IN_REVIEW invoices");
  }
  return {
    ...invoice,
    status: InvoiceStatus.CONFIRMED,
    verified_amount: invoice.claimed_amount ?? invoice.expected_amount
  };
}

function rejectPayment(invoice: Invoice, reason: string): Invoice {
  if (invoice.status !== InvoiceStatus.IN_REVIEW) {
    throw new Error("Invalid state transition: can only reject IN_REVIEW invoices");
  }
  return {
    ...invoice,
    status: InvoiceStatus.REJECTED,
    claimed_amount: null // Reset claimed amount on rejection per SRS
  };
}


describe('Payment State Machine Transitions', () => {
  it('should transition from UNPAID to IN_REVIEW when proof is submitted', () => {
    const invoice: Invoice = {
      id: "inv-1",
      status: InvoiceStatus.UNPAID,
      expected_amount: 1000,
      claimed_amount: null,
      verified_amount: null
    };

    const updatedInvoice = submitPaymentProof(invoice, 1000);

    expect(updatedInvoice.status).toBe(InvoiceStatus.IN_REVIEW);
    expect(updatedInvoice.claimed_amount).toBe(1000);
  });

  it('should transition from IN_REVIEW to CONFIRMED and set verified amount', () => {
    const invoice: Invoice = {
      id: "inv-2",
      status: InvoiceStatus.IN_REVIEW,
      expected_amount: 500,
      claimed_amount: 500,
      verified_amount: null
    };

    const updatedInvoice = confirmPayment(invoice);

    expect(updatedInvoice.status).toBe(InvoiceStatus.CONFIRMED);
    expect(updatedInvoice.verified_amount).toBe(500);
  });

  it('should transition from IN_REVIEW to REJECTED and reset claimed amount', () => {
    const invoice: Invoice = {
      id: "inv-3",
      status: InvoiceStatus.IN_REVIEW,
      expected_amount: 750,
      claimed_amount: 700,
      verified_amount: null
    };

    const updatedInvoice = rejectPayment(invoice, "Wrong Amount");

    expect(updatedInvoice.status).toBe(InvoiceStatus.REJECTED);
    expect(updatedInvoice.claimed_amount).toBeNull();
  });

  it('should allow re-submitting proof from REJECTED state', () => {
    const invoice: Invoice = {
      id: "inv-4",
      status: InvoiceStatus.REJECTED,
      expected_amount: 1000,
      claimed_amount: null,
      verified_amount: null
    };

    const updatedInvoice = submitPaymentProof(invoice, 1000);

    expect(updatedInvoice.status).toBe(InvoiceStatus.IN_REVIEW);
    expect(updatedInvoice.claimed_amount).toBe(1000);
  });

  it('should throw error if confirming an UNPAID invoice directly', () => {
    const invoice: Invoice = {
      id: "inv-5",
      status: InvoiceStatus.UNPAID,
      expected_amount: 1000,
      claimed_amount: null,
      verified_amount: null
    };

    expect(() => confirmPayment(invoice)).toThrow();
  });
});
