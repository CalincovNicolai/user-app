'use client';

import { IModalProps } from '@/utils/types';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import UserHeader from '@/components/user/header/UserHeader';
import UserFieldGrid from '@/components/user/field/UserFieldGrid';

export default function UserModal({ user, onClose }: IModalProps) {
  if (!user) return null;

  return (
    <Dialog open={true} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30 z-40 flex items-center justify-center">
        <DialogPanel className="bg-white p-6 rounded-lg shadow-xl max-w-xl w-full z-50">
          <DialogTitle className="text-xl font-bold mb-4">
            <UserHeader user={user} />
          </DialogTitle>
          <UserFieldGrid user={user} />
          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
