const contentDiv = document.getElementById("content-area");
const pageTitle = document.getElementById("page-title");

// Helper: Generate Initials for Avatar
function getInitials(name) {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

// Helper: Clear and Set Content
function setContent(html, title) {
    contentDiv.innerHTML = html;
    if (title) pageTitle.textContent = title;
}

// Renderers
function renderUsers(users) {
    const html = `
        <div class="grid-container">
            ${users.map(user => `
                <div class="card user-card">
                    <div class="user-avatar">${getInitials(user.name)}</div>
                    <div class="user-info">
                        <h3>${user.name}</h3>
                        <div class="user-handle">@${user.username}</div>
                        <div class="user-bio">${user.bio}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    setContent(html, "Community Members");
}

function renderThreads(threads) {
    const html = `
        <div class="list-container">
            ${threads.map(thread => `
                <div class="card thread-card">
                    <div class="card-title">${thread.title}</div>
                    <div class="card-meta">
                        <i class="bi bi-person-circle"></i>
                        <span>Posted by User #${thread.createdBy}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    setContent(html, "Active Discussions");
}

function renderPosts(posts) {
    const html = `
        <div class="list-container">
            ${posts.map(post => `
                <div class="card post-card">
                    <div class="card-body">"${post.text}"</div>
                    <div class="card-meta" style="margin-top: 1rem;">
                        <i class="bi bi-reply-fill"></i>
                        <span>Reply by User #${post.user}</span>
                        <span style="margin-left: auto; opacity: 0.5;">Thread #${post.thread}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    setContent(html, "Recent Activity");
}

function renderError(err) {
    const html = `
        <div class="card" style="border-color: #ef4444; color: #ef4444;">
            <h3><i class="bi bi-exclamation-triangle"></i> Error Loading Data</h3>
            <p>${err.toString()}</p>
        </div>
    `;
    setContent(html, "Error");
}

// Fetch Functions
function fetchUsers() {
    fetch("/api/users")
        .then(r => r.json())
        .then(data => renderUsers(data.users || data)) // Handle {users: [...]} or [...]
        .catch(renderError);
}

function fetchThreads() {
    fetch("/api/threads")
        .then(r => r.json())
        .then(data => renderThreads(data.threads || data))
        .catch(renderError);
}

function fetchPosts() {
    fetch("/api/posts/in-thread/1")
        .then(r => r.json())
        .then(data => renderPosts(data.posts || data))
        .catch(renderError);
}