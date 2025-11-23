export default function AddCrypto({ onClose}) {
  return (
    <div className="add-crypto-overlay">
      <form className="add-crypto-form">
        <h2>Add Cryptocurrency</h2>
        
        <label>
          Name:
          <input type="text" name="name" placeholder="e.g. Bitcoin" />
        </label>

        <label>
          Symbol:
          <input type="text" name="symbol" placeholder="e.g. BTC" />
        </label>

        <label>
          Rank:
          <input type="number" name="rank" placeholder="e.g. 1" />
        </label>

        <label>
          Active:
          <input type="checkbox" name="is_active" />
        </label>

        <button type="submit">Add Crypto</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}