function ComponentB() {
  // useState
  const [state, setState] = useState(initState)
  Khi muốn dữ liệu thay đổi thì giao diện tự động cập nhât render lại theo dữ liệu.
  Lưu ý:
  - Component được re-render sau khi `setState`
  - Initial state chỉ dùng cho lần đầu
  - Set state với callback?
  - Initial state với callback?
  - Set sate là thay thế state bằng giá trị mới

  //useEffect
  useEffect(() => {

  }, [deps])

  //useLayoutEffect
  useLayoutEffect(() => {

  }, [deps])

  // useRef
  const ref = useRef()

  //useCallback
  const fn = useCallback(() => {

  }, [deps])

  //useMemo
  const result = useMemo(() => {

  }, [deps])

  //useReducer
  const [state, dispatch] = useReducer(reduce, initialArg, init)

  //useContent
  const value = useContext(MyContent)

  //useDebugValue
  useDebugValue(isOnline ? 'Online' : 'Offline');

  return <h1>Hooks</h1>
}
