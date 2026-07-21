lucide.createIcons();

const registerAppShell = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js').catch((error) => console.warn('Service worker registration failed:', error));
        });
    }

    const splash = document.createElement('div');
    splash.id = 'app-splash';
    splash.innerHTML = `
        <div class="card">
            <img src="assets/app-splash.svg" alt="CMB logo" />
            <h1 class="text-2xl font-bold tracking-tight">CMB Tools</h1>
            <p class="mt-2 text-sm text-blue-50">Loading client workspace…</p>
        </div>
    `;
    document.body.appendChild(splash);
    window.setTimeout(() => splash.classList.add('hide'), 900);
    window.setTimeout(() => splash.remove(), 1250);
};

registerAppShell();

const STORAGE_KEY = 'cmb_clients_records';
let records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
let editingId = null;

function toggleSidebar() {
    const sidebar = document.getElementById('desktop-sidebar');
    const mainContent = document.getElementById('main-content');
    const topNav = document.getElementById('top-nav');
    const expanded = sidebar.classList.contains('sidebar-expanded');
    if (expanded) {
        sidebar.classList.remove('sidebar-expanded', 'w-64');
        sidebar.classList.add('sidebar-collapsed', 'w-20');
        mainContent.classList.remove('pl-64');
        mainContent.classList.add('pl-20');
        topNav.classList.remove('pl-64');
        topNav.classList.add('pl-20');
    } else {
        sidebar.classList.remove('sidebar-collapsed', 'w-20');
        sidebar.classList.add('sidebar-expanded', 'w-64');
        mainContent.classList.remove('pl-20');
        mainContent.classList.add('pl-64');
        topNav.classList.remove('pl-20');
        topNav.classList.add('pl-64');
    }
}

function resetForm() {
    document.getElementById('clientForm').reset();
    editingId = null;
    document.querySelector('button[type="submit"]').textContent = 'Save Client';
}

function saveRecord(event) {
    event.preventDefault();
    const form = event.target;
    const data = Object.fromEntries(new FormData(form).entries());
    data.CompanyID = data.CompanyID || `CMB-${String(records.length + 1).padStart(3, '0')}`;
    data.CreatedAt = data.CreatedAt || new Date().toISOString().slice(0, 10);
    data.UpdatedAt = new Date().toISOString().slice(0, 10);

    if (editingId) {
        records = records.map(item => item.id === editingId ? { ...item, ...data, id: editingId } : item);
    } else {
        records.unshift({ id: Date.now().toString(), ...data });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    renderTable();
    resetForm();
    form.reset();
}

function editRecord(id) {
    const record = records.find(item => item.id === id);
    if (!record) return;
    editingId = id;
    const form = document.getElementById('clientForm');
    Object.entries(record).forEach(([key, value]) => {
        const field = form.elements.namedItem(key);
        if (field) field.value = value || '';
    });
    document.querySelector('button[type="submit"]').textContent = 'Update Client';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteRecord(id) {
    if (!confirm('Delete this client record?')) return;
    records = records.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    renderTable();
}

function getFilteredRecords() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const status = document.getElementById('statusFilter').value;
    return records.filter(item => {
        const matchesSearch = !search || [item.CompanyName, item.City, item.Gstin, item.Email].some(v => String(v || '').toLowerCase().includes(search));
        const matchesStatus = status === 'All' || item.Status === status;
        return matchesSearch && matchesStatus;
    });
}

function renderTable() {
    const tbody = document.getElementById('clientTableBody');
    const filtered = getFilteredRecords();
    if (!filtered.length) {
        tbody.innerHTML = '<tr><td colspan="5" class="px-4 py-8 text-center text-slate-400">No client records found.</td></tr>';
        return;
    }

    tbody.innerHTML = filtered.map(item => `
        <tr class="hover:bg-slate-50">
            <td class="px-4 py-3 font-semibold text-slate-800">${item.CompanyName || '-'}</td>
            <td class="px-4 py-3">${item.City || '-'}</td>
            <td class="px-4 py-3">${item.Gstin || '-'}</td>
            <td class="px-4 py-3">
                <span class="px-2.5 py-1 rounded-full text-xs font-semibold ${item.Status === 'Active' ? 'bg-emerald-100 text-emerald-700' : item.Status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}">${item.Status || 'Active'}</span>
            </td>
            <td class="px-4 py-3">
                <div class="flex gap-2">
                    <button type="button" onclick="editRecord('${item.id}')" class="text-brand-600 hover:text-brand-700 text-sm font-semibold">Edit</button>
                    <button type="button" onclick="deleteRecord('${item.id}')" class="text-red-500 hover:text-red-700 text-sm font-semibold">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
}

document.getElementById('clientForm').addEventListener('submit', saveRecord);
document.getElementById('searchInput').addEventListener('input', renderTable);
document.getElementById('statusFilter').addEventListener('change', renderTable);

renderTable();
