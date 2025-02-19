// مصفوفة لتخزين الأطعمة المختارة
let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

// وظيفة لإظهار منيو الطعام
function showMenu() {
    document.getElementById("welcome-section").style.display = "none";
    document.getElementById("menu-section").style.display = "block";
}

// وظيفة لإضافة الأطعمة للطلب
function addItem(item, price) {
    // إضافة الطعام إلى المصفوفة
    selectedItems.push({ item, price });
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

    // عرض رسالة التنبيه داخل الصفحة
    const notification = document.getElementById('notification');
    notification.textContent = `${item} added to your order!`;
    notification.style.display = 'block';

    // إخفاء الرسالة بعد 3 ثواني
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
            notification.style.opacity = '1';
        }, 500);
    }, 3000);
}

// وظيفة لإظهار صفحة مراجعة الطلب
function showReview() {
    document.getElementById("menu-section").style.display = "none";
    document.getElementById("review-section").style.display = "block";

    let totalPrice = 0;
    const orderSummary = document.querySelector('.order-summary');

    // مسح محتوى المراجعة السابقة
    orderSummary.innerHTML = '';

    // عرض الأطعمة المختارة في صفحة المراجعة مع إضافة زر الحذف
    selectedItems.forEach((item, index) => {
        totalPrice += item.price;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('order-item');
        itemDiv.textContent = `${item.item} - ${item.price} EGP`;

        // زر لحذف العنصر
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Remove';
        deleteBtn.onclick = function () {
            removeItem(index);
        };

        // زر لإضافة عنصر آخر
        const addBtn = document.createElement('button');
        addBtn.textContent = 'Add Another Item';
        addBtn.onclick = function () {
            showMenu();  // العودة إلى منيو الطعام
        };

        itemDiv.appendChild(deleteBtn);
        itemDiv.appendChild(addBtn);
        orderSummary.appendChild(itemDiv);
    });

    const totalDiv = document.createElement('div');
    totalDiv.textContent = `Total Price: ${totalPrice} EGP`;
    orderSummary.appendChild(totalDiv);
}

// وظيفة لحذف عنصر من الطلب
function removeItem(index) {
    // إزالة العنصر من المصفوفة
    selectedItems.splice(index, 1);
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));

    // إعادة عرض صفحة المراجعة بعد التعديل
    showReview();
}

// وظيفة لإرسال الطلب
function submitOrder() {
    const tableNumber = document.getElementById('table-number').value;
    if (tableNumber) {
        alert(`Order submitted for table ${tableNumber}`);
        localStorage.clear(); // مسح الأطعمة بعد الإرسال
        window.location.reload(); // إعادة تحميل الصفحة
    } else {
        alert("Please enter your table number.");
    }
}
