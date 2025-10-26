import { useState, useRef, useEffect } from 'react';
import { Code2, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

interface AppHeaderProps {
  showAuthButton?: boolean;
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onManageSubscription?: () => void;
  onChangePassword?: () => void;
}

export function AppHeader({
  showAuthButton = false,
  onLoginClick,
  onManageSubscription,
  onChangePassword
}: AppHeaderProps) {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setShowDropdown(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Code2 className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Ryady.com
              </h1>
              <p className="text-xs text-gray-500">صانع الإضافات البرمجية</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {showAuthButton && !user && (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg text-sm"
              >
                <LogIn size={16} />
                <span>دخول</span>
              </button>
            )}

            {user && (
              <>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg text-sm"
                >
                  <LogOut size={16} />
                  <span>خروج</span>
                </button>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <User size={20} />
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-xs text-gray-500">مسجل الدخول كـ</p>
                        <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                      </div>

                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          onChangePassword?.();
                        }}
                        className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        تغيير كلمة المرور
                      </button>

                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          onManageSubscription?.();
                        }}
                        className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        إدارة الاشتراك
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
