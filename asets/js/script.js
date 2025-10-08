// // script.js
// // بيانات تجريبية تشبه الصورة (يمكن استبدالها بواجهة API لاحقاً)
// const transactions = [
//   {action:'•••', type:'تسوية نقاط البيع', balance:1132.57, amount:368.07, amountClass:'credit', details:'تسوية نقاط البيع', date:'20-08-2025'},
//   {action:'•••', type:'رسوم بنكية/عمولات', balance:764.50, amount:207.00, amountClass:'debit', details:'SME CENTER RIYADH.. AL-NAFAL', date:'27-07-2025'},
//   {action:'•••', type:'رسوم بنكية/عمولات', balance:971.50, amount:17.25, amountClass:'debit', details:'SME CENTER RIYADH.. AL-NAFAL', date:'10-07-2025'},
//   {action:'•••', type:'حوالة مالية واردة سريعة', balance:988.75, amount:500.00, amountClass:'credit', details:'VIA CORE SYSTEM', date:'10-07-2025'},
//   {action:'•••', type:'حوالة مالية واردة سريعة', balance:488.75, amount:488.00, amountClass:'credit', details:'VIA CORE SYSTEM', date:'10-07-2025'},
//   {action:'•••', type:'تسوية نقاط البيع', balance:1500.00, amount:120.00, amountClass:'credit', details:'POS SETTLEMENT', date:'05-06-2025'}
// ];

// let state = { q:'', page:1, perPage:10, rows:transactions };

// const tbody = document.getElementById('tbody');
// const pagination = document.getElementById('pagination');
// const perPageSelect = document.getElementById('perPage');
// const searchInput = document.getElementById('search');

// function formatNumber(n){
//   return Number(n).toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2});
// }

// function escapeHtml(str){
//   if(str === null || str === undefined) return '';
//   return String(str).replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; });
// }

// function render(){
//   // If tbody already contains rows (static HTML), do not overwrite them.
//   if (tbody && tbody.children.length > 0) return;
//   const q = state.q.trim().toLowerCase();
//   let filtered = state.rows.filter(r=>{
//     if(!q) return true;
//     return (r.type + ' ' + r.details + ' ' + r.date).toLowerCase().includes(q);
//   });

//   const total = filtered.length;
//   const totalPages = Math.max(1, Math.ceil(total/state.perPage));
//   if(state.page > totalPages) state.page = totalPages;
//   const start = (state.page-1) * state.perPage;
//   const pageRows = filtered.slice(start, start + state.perPage);

//   tbody.innerHTML = pageRows.map(r=>`
//     <tr>
//       <td style="width:60px"><div class="dots" aria-hidden="true">• • •</div></td>
//       <td>${escapeHtml(r.type)}</td>
//       <td>${formatNumber(r.balance)}</td>
//       <td class="amount ${r.amountClass === 'credit' ? 'credit' : 'debit'}">${formatNumber(r.amount)}</td>
//       <td class="muted">${escapeHtml(r.details)}</td>
//       <td>${escapeHtml(r.date)} <button class="btn" onclick="toggleDetails(this)" aria-expanded="false">▾</button></td>
//     </tr>
//   `).join('');

//   // pagination
//   pagination.innerHTML = '';
//   const info = document.createElement('div');
//   info.className = 'small';
//   info.textContent = `${total} نتيجة`;
//   pagination.appendChild(info);

//   // prev
//   const prev = document.createElement('button'); prev.className='page-btn'; prev.textContent='‹';
//   prev.disabled = state.page === 1; prev.onclick = ()=>{ state.page--; render(); };
//   pagination.appendChild(prev);

//   // pages range (حجم صغير لعدم تشويش الواجهة)
//   const maxButtons = 7;
//   let startPage = Math.max(1, state.page - Math.floor(maxButtons/2));
//   let endPage = Math.min(totalPages, startPage + maxButtons - 1);
//   if(endPage - startPage < maxButtons - 1) startPage = Math.max(1, endPage - maxButtons + 1);

//   for(let p = startPage; p <= endPage; p++){
//     const b = document.createElement('button'); b.className='page-btn'; b.textContent = p;
//     if(p === state.page){ b.style.fontWeight = '700'; b.setAttribute('aria-current','page'); }
//     b.onclick = ()=>{ state.page = p; render(); };
//     pagination.appendChild(b);
//   }

//   // next
//   const next = document.createElement('button'); next.className='page-btn'; next.textContent='›';
//   next.disabled = state.page >= totalPages; next.onclick = ()=>{ state.page++; render(); };
//   pagination.appendChild(next);
// }

// // events
// perPageSelect.addEventListener('change', e=>{
//   state.perPage = parseInt(e.target.value, 10);
//   state.page = 1;
//   render();
// });

// searchInput.addEventListener('input', e=>{
//   state.q = e.target.value;
//   state.page = 1;
//   render();
// });

// // تحميل CSV
// document.getElementById('download').addEventListener('click', () => {
//   const rows = [['التاريخ','التفاصيل','المبلغ','الرصيد','نوع العملية']];
//   state.rows.forEach(r => rows.push([r.date, r.details, r.amount, r.balance, r.type]));
//   const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
//   const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url; a.download = 'transactions.csv'; a.click();
//   URL.revokeObjectURL(url);
// });

// // تحديث (تجريبي)
// document.getElementById('refresh').addEventListener('click', ()=>{
//   alert('تم تحديث البيانات (تجريبي)');
//   render();
// });

// // تفاصيل الصف (تحت كل صف)
// function toggleDetails(btn){
//   const tr = btn.closest('tr');
//   if(tr.nextElementSibling && tr.nextElementSibling.classList.contains('details')){
//     tr.nextElementSibling.remove();
//     btn.setAttribute('aria-expanded','false');
//     return;
//   }
//   const detailsRow = document.createElement('tr');
//   detailsRow.className = 'details';
//   detailsRow.innerHTML = '<td colspan="6">تفاصيل إضافية: هذه بيانات توضيحية ولا تمثل بيانات حقيقية.</td>';
//   tr.insertAdjacentElement('afterend', detailsRow);
//   btn.setAttribute('aria-expanded','true');
// }
// window.toggleDetails = toggleDetails;

// // initial render
// render();