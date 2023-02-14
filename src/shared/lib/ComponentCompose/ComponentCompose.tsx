type ComponentInput<P = any> = [
    component: React.JSXElementConstructor<P>,
    props: P,
];

interface ComponentComposeProps {
    components: ComponentInput[];
    children: React.ReactNode;
}

export const ComponentCompose = ({
    components,
    children,
}: ComponentComposeProps) => {
    for (let i = components.length - 1; i >= 0; --i) {
        const [Component, props] = components[i];
        children = <Component {...props}>{children}</Component>;
    }
    return <>{children}</>;
};
