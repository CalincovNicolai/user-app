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
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
