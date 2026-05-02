document.addEventListener('DOMContentLoaded', () => {
    const leadForm = document.getElementById('lead-form');
    
    if(leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const phoneInput = document.getElementById('phone-input').value;
            
            if(phoneInput.trim() !== '') {
                const btn = leadForm.querySelector('.btn-primary');
                const originalText = btn.textContent;
                
                btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Отправка...';
                btn.style.opacity = '0.8';
                btn.disabled = true;

                fetch('/api/submit-lead', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ phone: phoneInput })
                })
                .then(response => {
                    if (response.ok) {
                        btn.innerHTML = '<i class="ph ph-check-circle"></i> Заявка отправлена!';
                        btn.style.background = 'linear-gradient(to right, #10b981, #059669)';
                        leadForm.reset();
                    } else {
                        btn.innerHTML = '<i class="ph ph-warning"></i> Ошибка отправки';
                        btn.style.background = 'linear-gradient(to right, #ef4444, #b91c1c)';
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    btn.innerHTML = '<i class="ph ph-warning"></i> Ошибка сети';
                    btn.style.background = 'linear-gradient(to right, #ef4444, #b91c1c)';
                })
                .finally(() => {
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                        btn.style.opacity = '1';
                        btn.disabled = false;
                    }, 3000);
                });
            }
        });
    }

    // Smooth scroll for anchors (if any)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
