import routes from 'app/config/routes';

export const buildNestedPath = (basePath, path) => (
    `${basePath ? `/${basePath}` : ''}/${path || ''}`.replace(/(.+)\/$/, '$1').replace(/\/{2,}/g, '/')
);

export const checkPathIsActive = (path, locationPath, useFullLocationPath = true) => {
    if (useFullLocationPath) {
        return path === locationPath;
    }

    return path === `/${locationPath.split('/')[1]}`;
};

const parseNavItem = (item, index, locationPath, useFullLocationPath = true) => {
    const path = buildNestedPath(item.basePath, item.path);
    const isActive = checkPathIsActive(path, locationPath, useFullLocationPath);

    const children = item.children && item.children.length
        ? item.children.map((child, cIndex) => parseNavItem({ ...child, basePath: path }, cIndex, locationPath, true))
        : null;

    return {
        ...item,
        children,
        path,
        isActive,
        key: index,
    };
};

export const getPrimaryNav = locationPath => (
    routes.filter(item => Boolean(item.label)).map((item, index) => parseNavItem(item, index, locationPath, false))
);

export const parseTabs = (tabs, basePath, locationPath) => tabs.map((item, index) => parseNavItem({
    ...item,
    basePath,
}, index, locationPath));

