import {useState} from 'react';
import '../css/deleteCrypto.css'

export default function DeleteCrypto({ onClose}) {
    const [name, setName] = useState('');
    const [disabled, setDisabled] = useState(false);

    const handleDelete = (e) => {
        e.preventDefault();
        setDisabled(true);

         const token = localStorage.getItem("token");

        fetch(`http://localhost:3000/crypto/${name}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`}
        })
        .then(async (res) => {
            if (res.ok) {
                alert(`Cryptocurrency ${name} deleted successfully.`);
                window.location.href = '/';
            } else {
                const errorData = await res.json();
                alert(errorData.message || 'failed to delete');
            }
        })
        .catch(() => {
            alert('Network error, please try again later.');
        })

    }



 return (
    <div className="deleteCrypto">
      <form onSubmit={handleDelete} className="deleteCryptoForm">
        <h2>Delete Cryptocurrency</h2>

        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <button type="submit" disabled={disabled}>Delete</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );

}