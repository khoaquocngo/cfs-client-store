# getInfoByUuid

## Input

```ts
    id: string;
```

## Reponse

```ts
{
  isSuccess: boolean;
  message: string;
  data: {
    contact: string;
    displayName: string;
    dream: string;
    message: string;
    sex: string;
  }
}
```

## Error

- `uuid not found!` -> Có thể hiển thị thông báo code của bạn không đúng có thể liên hệ page để cấp lại code khi bạn tham gia event
- `data` empty. Case nếu h đến cuối tuần có `Sex = Other` duy nhất 1 thằng thì sẽ dính -> Có thể hiển thị hiện tại chưa có ứng viên phù hợp bạn có thể quay lại sau. Chúc bạn giáng sinh an lành bla bla gì đó
