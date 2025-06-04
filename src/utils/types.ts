import React, { ReactNode } from 'react';

export interface IUserModel {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string | null;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface IModalProps {
  user: IUserModel | null;
  onClose: () => void;
}

export interface IUserHeaderModel {
  user: IUserModel;
}

export interface IUserItemModel {
  user: IUserModel;
  onBack: () => void;
}

export interface IUserFieldModel {
  label: string;
  value: string | number | null;
  format?: (value: IUserModel) => string;
}

export interface IUserFieldGridModel {
  user: IUserModel;
}

export interface IUserGridModel {
  users: IUserModel[];
  onUserClick: (user: IUserModel) => void;
  loading?: boolean;
  usersPerPage?: number;
}

export interface IUserListContainerModel {
  onUserClick: (user: IUserModel) => void;
  usersPerPage?: number;
}

export interface IUserDetailsCardModel {
  user: IUserModel;
  backButton?: ReactNode;
}

export interface IFadeLoaderModel {
  loading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
}

export interface ISearchModel {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onRefresh?: () => void;
  loading?: boolean;
  refreshCooldown?: number;
  debounceDelay?: number;
  sortBy: ISortEnum;
  onSortChange: (sort: ISortEnum) => void;
}

export interface IRefreshButtonModel {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  cooldownLeft?: number;
  title?: string;
}

export interface ISortSelectModel {
  value: ISortEnum;
  onChange: (value: ISortEnum) => void;
  loading?: boolean;
}

export interface ISortingOptionsModel {
  label: string;
  value: ISortEnum;
}

export enum ISortEnum {
  NONE = 'none',
  NAME = 'name',
  EMAIL = 'email',
}

export interface ITabsModel {
  label: string;
  component: React.ReactNode;
}

export interface IPaginationModel {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export type UserDetailPageParams = Promise<{ uuid: string }>;
