// State Management
let contacts = [];
let editingId = null;
let deleteId = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadData(); // Menggunakan fungsi loadData yang baru
    renderContacts();
    setupEventListeners();
});

// Load Data (Logic: Cek LocalStorage dulu, kalau kosong baru load Demo)
function loadData() {
    const storedContacts = localStorage.getItem('myContactsApp');
    
    if (storedContacts) {
        // Jika ada data di memori browser, gunakan itu
        contacts = JSON.parse(storedContacts);
    } else {
        // Jika tidak ada, gunakan data demo default
        contacts = [
            { 
                id: 1, 
                name: 'Budi Santoso', 
                email: 'budi@email.com', 
                phone: '081234567890', 
                address: 'Jakarta', 
                company: 'PT Maju Jaya' 
            },
            { 
                id: 2, 
                name: 'Siti Aminah', 
                email: 'siti@email.com', 
                phone: '082345678901', 
                address: 'Bandung', 
                company: 'CV Berkah' 
            },
            { 
                id: 3, 
                name: 'Ahmad Fauzi', 
                email: 'ahmad@email.com', 
                phone: '083456789012', 
                address: 'Surabaya', 
                company: 'PT Sejahtera' 
            }
        ];
        // Simpan data demo ke storage agar siap diedit
        saveToLocalStorage();
    }
}

// Helper: Simpan ke LocalStorage browser
function saveToLocalStorage() {
    localStorage.setItem('myContactsApp', JSON.stringify(contacts));
}

// Setup Event Listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function(e) {
        renderContacts(e.target.value);
    });
}

// Render Contacts
function renderContacts(searchTerm = '') {
    const grid = document.getElementById('contactsGrid');
    const emptyState = document.getElementById('emptyState');
    
    let filtered = contacts;
    
    if (searchTerm) {
        filtered = contacts.filter(contact => 
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.phone.includes(searchTerm)
        );
    }
    
    if (filtered.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    grid.innerHTML = filtered.map(contact => `
        <div class="contact-card">
            <div class="contact-header">
                <div class="contact-avatar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
                <div class="contact-actions">
                    <button class="btn-icon edit" onclick="handleEdit(${contact.id})" title="Edit kontak">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="btn-icon delete" onclick="handleDeleteClick(${contact.id})" title="Hapus kontak">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
            
            <h3 class="contact-name">${contact.name}</h3>
            
            <div class="contact-info">
                <div class="contact-info-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <span>${contact.email}</span>
                </div>
                <div class="contact-info-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>${contact.phone}</span>
                </div>
                ${contact.address ? `
                <div class="contact-info-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>${contact.address}</span>
                </div>
                ` : ''}
            </div>
            
            ${contact.company ? `
                <div class="contact-company">${contact.company}</div>
            ` : ''}
        </div>
    `).join('');
}

// Open Add Modal
function openAddModal() {
    editingId = null;
    document.getElementById('modalTitle').textContent = 'Tambah Kontak Baru';
    document.getElementById('inputName').value = '';
    document.getElementById('inputEmail').value = '';
    document.getElementById('inputPhone').value = '';
    document.getElementById('inputAddress').value = '';
    document.getElementById('inputCompany').value = '';
    document.getElementById('modal').classList.add('show');
}

// Close Modal
function closeModal() {
    document.getElementById('modal').classList.remove('show');
    editingId = null;
}

// Handle Edit
function handleEdit(id) {
    const contact = contacts.find(c => c.id === id);
    if (!contact) return;
    
    editingId = id;
    document.getElementById('modalTitle').textContent = 'Edit Kontak';
    document.getElementById('inputName').value = contact.name;
    document.getElementById('inputEmail').value = contact.email;
    document.getElementById('inputPhone').value = contact.phone;
    document.getElementById('inputAddress').value = contact.address || '';
    document.getElementById('inputCompany').value = contact.company || '';
    document.getElementById('modal').classList.add('show');
}

// Handle Submit
function handleSubmit() {
    const name = document.getElementById('inputName').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const phone = document.getElementById('inputPhone').value.trim();
    const address = document.getElementById('inputAddress').value.trim();
    const company = document.getElementById('inputCompany').value.trim();
    
    if (!name || !email || !phone) {
        alert('Nama, Email, dan Nomor Telepon harus diisi!');
        return;
    }
    
    if (editingId) {
        // Update existing contact
        const index = contacts.findIndex(c => c.id === editingId);
        if (index !== -1) {
            contacts[index] = {
                id: editingId,
                name,
                email,
                phone,
                address,
                company
            };
        }
    } else {
        // Add new contact
        const newContact = {
            id: Date.now(),
            name,
            email,
            phone,
            address,
            company
        };
        contacts.push(newContact);
    }
    
    // SIMPAN PERUBAHAN KE LOCALSTORAGE
    saveToLocalStorage();
    
    closeModal();
    renderContacts();
}

// Handle Delete Click
function handleDeleteClick(id) {
    deleteId = id;
    document.getElementById('deleteModal').classList.add('show');
}

// Confirm Delete
function confirmDelete() {
    if (deleteId) {
        contacts = contacts.filter(c => c.id !== deleteId);
        
        // SIMPAN PERUBAHAN SETELAH DELETE
        saveToLocalStorage();
        
        renderContacts();
        cancelDelete();
    }
}

// Cancel Delete
function cancelDelete() {
    document.getElementById('deleteModal').classList.remove('show');
    deleteId = null;
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('modal');
    const deleteModal = document.getElementById('deleteModal');
    
    if (e.target === modal) {
        closeModal();
    }
    if (e.target === deleteModal) {
        cancelDelete();
    }
});