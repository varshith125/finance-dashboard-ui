import TransactionTable from '../transactions/TransactionTable.tsx';

export default function TransactionsPage() {
  return (
    <div>
      <div className="section-heading">All Transactions</div>
      <TransactionTable />
    </div>
  );
}
