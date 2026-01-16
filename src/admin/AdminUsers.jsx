






import React, { useState, useEffect } from "react";
import api from "../Api/Axios_Instance.jsx";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', status: 'active' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
     const response = await api.get("/admin/users");
const normalized = response.data.data.map(u => ({
  ...u,
  status: u.isBlocked ? "blocked" : "active"
}));

setUsers(normalized);


        setError('');
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setError('Failed to load users. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Auto-hide success message
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Search and filter users
  const filteredUsers = users.filter(user => {
    if (!user) return false;
    return (
      (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (user.id?.toString() || '').includes(searchTerm)
    );
  });

  // Sort users
  const sortedUsers = React.useMemo(() => {
    if (sortConfig.key) {
      return [...filteredUsers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredUsers;
  }, [filteredUsers, sortConfig]);

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle user selection
  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === currentUsers.length 
        ? [] 
        : currentUsers.map(user => user.id)
    );
  };

  // Handle user actions
const handleBlockUser = async (userId) => {
  setActionLoading(true);

  try {
    // Call your real backend endpoint
    await api.patch(`/admin/users/${userId}/toggle-block`);

    // Update UI state to match backend
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? {
              ...user,
              isBlocked: !user.isBlocked,
              status: !user.isBlocked ? "blocked" : "active"
            }
          : user
      )
    );

    setSuccessMessage("User status updated successfully");
  } catch (error) {
    console.error("Failed to toggle block:", error);
    setError("Failed to update user status.");
  } finally {
    setActionLoading(false);
  }
};


  const handleRemoveUser = async (userId) => {
    if (window.confirm('Are you sure you want to permanently remove this user? This action cannot be undone.')) {
      setActionLoading(true);
      try {
await api.delete(`/admin/users/${userId}`);
        
        setUsers(prev => prev.filter(user => user.id !== userId));
        setSelectedUsers(prev => prev.filter(id => id !== userId));
        setSuccessMessage('User removed successfully');
      } catch (error) {
        console.error("Failed to remove user:", error);
        setError('Failed to remove user. Please try again.');
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleEditUser = async (userId, updatedData) => {
    setActionLoading(true);
    try {
      await api.patch(`/users/${userId}`, updatedData);
      
      setUsers(prev => prev.map(user => 
        user.id === userId 
          ? { ...user, ...updatedData }
          : user
      ));
      
      setShowEditModal(false);
      setSuccessMessage('User updated successfully');
    } catch (error) {
      console.error("Failed to update user:", error);
      setError('Failed to update user. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

 const handleBulkAction = async (action) => {
  if (selectedUsers.length === 0) return;

  const confirmMessage =
    action === "remove"
      ? `Are you sure you want to remove ${selectedUsers.length} users?`
      : `Are you sure you want to ${action} ${selectedUsers.length} users?`;

  if (!window.confirm(confirmMessage)) return;

  setActionLoading(true);
  try {
    if (action === "remove") {
      await Promise.all(
        selectedUsers.map(id => api.delete(`/admin/users/${id}`))
      );
      setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id)));
    }

    if (action === "block") {
      await Promise.all(
        selectedUsers.map(id => api.patch(`/admin/users/${id}/block`))
      );
      setUsers(prev =>
        prev.map(user =>
          selectedUsers.includes(user.id)
            ? { ...user, isBlocked: true }
            : user
        )
      );
    }

    if (action === "unblock") {
      await Promise.all(
        selectedUsers.map(id => api.patch(`/admin/users/${id}/unblock`))
      );
      setUsers(prev =>
        prev.map(user =>
          selectedUsers.includes(user.id)
            ? { ...user, isBlocked: false }
            : user
        )
      );
    }

    setSelectedUsers([]);
    setSuccessMessage(`Users ${action}ed successfully`);
  } catch (error) {
    console.error(`Failed to ${action} users:`, error);
    setError(`Failed to ${action} users.`);
  } finally {
    setActionLoading(false);
  }
};


  // Handle user details modal
  const openUserModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditFormData({
      name: user.name || '',
      email: user.email || '',
      status: user.status || 'active'
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleEditUser(selectedUser.id, editFormData);
  };

  const getStatusBadge = (status) => {
    // Handle undefined, null, or empty status
    const normalizedStatus = status && typeof status === 'string' ? status.toLowerCase() : 'inactive';
    
    const statusConfig = {
      active: { bg: 'bg-emerald-900/50', text: 'text-emerald-400', border: 'border-emerald-500/30' },
      blocked: { bg: 'bg-red-900/50', text: 'text-red-400', border: 'border-red-500/30' },
      inactive: { bg: 'bg-gray-700/50', text: 'text-gray-400', border: 'border-gray-500/30' }
    };
    
    const config = statusConfig[normalizedStatus] || statusConfig.inactive;
    const displayStatus = normalizedStatus || 'inactive';
    
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}>
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${normalizedStatus === 'active' ? 'bg-emerald-400' : normalizedStatus === 'blocked' ? 'bg-red-400' : 'bg-gray-400'}`}></span>
        {displayStatus.charAt(0).toUpperCase() + displayStatus.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-4 p-3 sm:p-4 rounded-lg bg-green-900/50 border border-green-500/30 text-green-400 text-sm sm:text-base">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 sm:p-4 rounded-lg bg-red-900/50 border border-red-500/30 text-red-400 text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">User Management</h1>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-400">Manage and monitor user accounts</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-800 border border-gray-700 px-3 sm:px-4 py-2 rounded-lg shadow-sm">
                <span className="text-xs sm:text-sm text-gray-400">Total Users:</span>
                <span className="ml-1 sm:ml-2 text-base sm:text-lg font-semibold text-blue-400">{users.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm mb-4 sm:mb-6">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search users by name, email, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>

              {/* Action Buttons */}
              {selectedUsers.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleBulkAction('block')}
                    disabled={actionLoading}
                    className="bg-yellow-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-yellow-700 transition-colors text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    Block ({selectedUsers.length})
                  </button>
                  <button
                    onClick={() => handleBulkAction('unblock')}
                    disabled={actionLoading}
                    className="bg-green-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    Unblock ({selectedUsers.length})
                  </button>
                  <button
                    onClick={() => handleBulkAction('remove')}
                    disabled={actionLoading}
                    className="bg-red-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    Remove ({selectedUsers.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-750">
                <tr>
                  <th className="w-12 px-3 sm:px-4 md:px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                    />
                  </th>
                  <th 
                    className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center space-x-1">
                      <span className="hidden xs:inline">ID</span>
                      <span className="xs:hidden">#</span>
                      {sortConfig.key === 'id' && (
                        <span className="text-blue-400 text-xs">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                      {sortConfig.key === 'name' && (
                        <span className="text-blue-400 text-xs">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors hidden sm:table-cell"
                    onClick={() => handleSort('email')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Email</span>
                      {sortConfig.key === 'email' && (
                        <span className="text-blue-400 text-xs">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">
                    Joined
                  </th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {currentUsers.length > 0 ? currentUsers.map((user, index) => (
                  <tr 
                    key={user?.id || index} 
                    className={`hover:bg-gray-750 transition-colors ${
                      selectedUsers.includes(user?.id) ? 'bg-blue-900/20' : ''
                    }`}
                  >
                    <td className="w-12 px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user?.id)}
                        onChange={() => handleSelectUser(user?.id)}
                        className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                      />
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-300">
                      #{user?.id || 'N/A'}
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                            {(user?.name || 'U').charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-2 sm:ml-4 min-w-0">
                          <div className="text-xs sm:text-sm font-medium text-white truncate max-w-[120px] sm:max-w-none">
                            {user?.name || 'Unknown User'}
                          </div>
                          <div className="text-xs text-gray-400 sm:hidden truncate max-w-[120px]">
                            {user?.email || 'No email'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-300 hidden sm:table-cell">
                      <div className="truncate max-w-[150px] lg:max-w-[200px]">
                        {user?.email || 'No email provided'}
                      </div>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user?.status)}
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-400 hidden md:table-cell">
                      {user?.joinedDate || new Date().toLocaleDateString()}
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                      <div className="flex flex-col xs:flex-row xs:items-center xs:space-x-2 space-y-1 xs:space-y-0">
                        <button
                          onClick={() => openUserModal(user)}
                          className="text-blue-400 hover:text-blue-300 transition-colors text-left xs:text-center text-xs sm:text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => openEditModal(user)}
                          className="text-indigo-400 hover:text-indigo-300 transition-colors text-left xs:text-center text-xs sm:text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleBlockUser(user?.id)}
                          disabled={actionLoading}
                          className={`transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left xs:text-center text-xs sm:text-sm ${
                            user?.status === 'blocked' 
                              ? 'text-green-400 hover:text-green-300' 
                              : 'text-yellow-400 hover:text-yellow-300'
                          }`}
                        >
                          {user?.status === 'blocked' ? 'Unblock' : 'Block'}
                        </button>
                        <button
                          onClick={() => handleRemoveUser(user?.id)}
                          disabled={actionLoading}
                          className="text-red-400 hover:text-red-300 transition-colors text-left xs:text-center text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="px-3 sm:px-6 py-8 text-center text-gray-400 text-sm sm:text-base">
                      {loading ? 'Loading users...' : 'No users found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-800 px-3 sm:px-4 py-3 border-t border-gray-700 sm:px-6">
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between space-y-3 xs:space-y-0">
              <div className="flex items-center text-xs sm:text-sm text-gray-400">
                <span>
                  Showing <span className="font-medium text-white">{indexOfFirstUser + 1}</span> to{' '}
                  <span className="font-medium text-white">
                    {Math.min(indexOfLastUser, sortedUsers.length)}
                  </span> of{' '}
                  <span className="font-medium text-white">{sortedUsers.length}</span> results
                </span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-600 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let page;
                    if (totalPages <= 5) {
                      page = i + 1;
                    } else if (currentPage <= 3) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded transition-colors min-w-[32px] sm:min-w-[36px] ${
                          currentPage === page
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-2 sm:px-3 py-1 text-xs sm:text-sm border border-gray-600 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User Details Modal */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 backdrop-blur-sm p-3 sm:p-4">
            <div className="relative top-4 sm:top-8 lg:top-20 mx-auto p-4 sm:p-5 border border-gray-600 w-full max-w-xs sm:max-w-sm md:max-w-md shadow-2xl rounded-lg bg-gray-800">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">User Details</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-200 transition-colors p-1"
                  >
                    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg sm:text-xl">
                      {(selectedUser.name || 'Unknown').charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Name</label>
                    <p className="mt-1 text-sm text-white">{selectedUser.name || 'Unknown User'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Email</label>
                    <p className="mt-1 text-sm text-white break-words">{selectedUser.email || 'No email provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">User ID</label>
                    <p className="mt-1 text-sm text-white">#{selectedUser.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Status</label>
                    <div className="mt-1">
                      {getStatusBadge(selectedUser.status)}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0 mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-600 text-gray-200 rounded hover:bg-gray-500 transition-colors text-sm sm:text-base order-2 sm:order-1"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleBlockUser(selectedUser.id)}
                    disabled={actionLoading}
                    className={`px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base order-1 sm:order-2 ${
                      selectedUser.status === 'blocked'
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-yellow-600 text-white hover:bg-yellow-700'
                    }`}
                  >
                    {selectedUser.status === 'blocked' ? 'Unblock User' : 'Block User'}
                  </button>
                  <button 
                    onClick={() => {
                      setShowModal(false);
                      openEditModal(selectedUser);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm sm:text-base order-3"
                  >
                    Edit User
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 backdrop-blur-sm p-3 sm:p-4">
            <div className="relative top-4 sm:top-8 lg:top-20 mx-auto p-4 sm:p-5 border border-gray-600 w-full max-w-xs sm:max-w-sm md:max-w-md shadow-2xl rounded-lg bg-gray-800">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Edit User</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-200 transition-colors p-1"
                  >
                    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData(prev => ({...prev, name: e.target.value}))}
                      className="w-full px-3 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      value={editFormData.email}
                      onChange={(e) => setEditFormData(prev => ({...prev, email: e.target.value}))}
                      className="w-full px-3 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                    <select
                      value={editFormData.status}
                      onChange={(e) => setEditFormData(prev => ({...prev, status: e.target.value}))}
                      className="w-full px-3 py-2 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    >
                      <option value="active">Active</option>
                      <option value="blocked">Blocked</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0 mt-6">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="px-4 py-2 bg-gray-600 text-gray-200 rounded hover:bg-gray-500 transition-colors text-sm sm:text-base order-2 sm:order-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
                    >
                      {actionLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {actionLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6 shadow-2xl mx-4">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-blue-500"></div>
                <span className="text-white text-sm sm:text-base">Processing action...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;