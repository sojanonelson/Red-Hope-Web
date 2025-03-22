import React from "react";

// Card Component
export function Card({ children }) {
  return <div className="bg-white shadow-lg rounded-lg p-6">{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function CardTitle({ children }) {
  return <h3 className="text-xl font-bold text-gray-900">{children}</h3>;
}

export function CardDescription({ children }) {
  return <p className="text-sm text-gray-500">{children}</p>;
}

export function CardContent({ children }) {
  return <div className="text-gray-600">{children}</div>;
}

// Tabs Component
export function Tabs({ defaultValue, children, className }) {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
}

export function TabsList({ children, className }) {
  return <div className={`flex border-b ${className}`}>{children}</div>;
}

export function TabsTrigger({ value, children, activeTab, setActiveTab }) {
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-sm font-medium ${
        activeTab === value
          ? "border-b-2 border-red-600 text-red-600"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, activeTab }) {
  return activeTab === value ? <div>{children}</div> : null;
}
