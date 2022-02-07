## 分割ルール

```
1 ./document/pathsにエンドポイント(パスのパーツ)を配置

2 ./document/shcemasにコンポーネントを配置(index.yamlがメイン)

3 ./documentにswagger.yamlの本体に追記

4 ./documentにgenerated.yamlを配置
```


## 分割したファイルを結合する

```
swagger-cli bundle -o ./document/generated.yaml -t yaml ./document/swagger.yaml
```

上記で統合したファイルを使用し、右のURLで確認する
[https://editor.swagger.io/](https://editor.swagger.io/)


