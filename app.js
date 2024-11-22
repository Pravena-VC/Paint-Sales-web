const addToCart = async () => {
    const paintColor = document.getElementById('paintColor').value;
    const quantity = document.getElementById('quantity').value;

    const response = await fetch('http://localhost:3000/addToCart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paintColor, quantity }),
    });

    const result = await response.json();
    alert(result.message);

    if (result.success) {
        const cartItems = document.getElementById('cartItems');
        const listItem = document.createElement('li');
        listItem.className = 'cartItem';
        listItem.textContent = `${quantity} gallon(s) of ${paintColor} paint`;
        cartItems.appendChild(listItem);
    } else {
        alert('Failed to add item to cart.');
    }
};
