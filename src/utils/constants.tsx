import {
  ISortEnum,
  ISortingOptionsModel,
  ITabsModel,
  IUserFieldModel,
  IUserModel,
} from '@/utils/types';
import UserListWithModal from '@/components/user/UserListWithModal';
import UserListWithLinks from '@/components/user/UserListWithLinks';
import UserListWithNavigation from '@/components/user/UserListWithNavigation';

export const USER_KEY = 'userListCache';
export const TAB_KEY = 'lastSelectedUserTab';
export const CACHE_DURATION = 60 * 60 * 1000;
export const sortOptions: ISortingOptionsModel[] = [
  { label: 'No Sorting', value: ISortEnum.NONE },
  { label: 'Sort by Name', value: ISortEnum.NAME },
  { label: 'Sort by Email', value: ISortEnum.EMAIL },
];

export const tabs: ITabsModel[] = [
  { label: 'Modal View', component: <UserListWithModal /> },
  { label: 'Inline Page View', component: <UserListWithLinks /> },
  { label: 'Route View', component: <UserListWithNavigation /> },
];

export const userFields: IUserFieldModel[] = [
  { label: 'Email', value: 'email' },
  {
    label: 'Username',
    value: 'username',
    format: (user: IUserModel) => `${user.login.username}`,
  },
  { label: 'Phone', value: 'phone' },
  { label: 'Cell', value: 'cell' },
  {
    label: 'Age',
    value: 'age',
    format: (user: IUserModel) => `${user.dob.age}`,
  },
  { label: 'Gender', value: 'gender' },
  { label: 'Nationality', value: 'nat' },
  {
    label: 'Date of Birth',
    value: 'dob.date',
    format: (user: IUserModel) => new Date(user.dob.date).toLocaleDateString(),
  },
  {
    label: 'Registered Date',
    value: 'registered.date',
    format: (user: IUserModel) => new Date(user.registered.date).toLocaleDateString(),
  },
  {
    label: 'Location',
    value: 'location',
    format: (user: IUserModel) =>
      `${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`,
  },
];
