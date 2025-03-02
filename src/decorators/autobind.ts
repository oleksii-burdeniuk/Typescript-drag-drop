// auto bind decorator

export function autoBind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFnc = originalMethod.bind(this);
      return boundFnc;
    },
  };
  return adjDescriptor;
}
