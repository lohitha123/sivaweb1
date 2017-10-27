set msBuildDir=%WINDIR%\Microsoft.NET\Framework\v4.0.30319
@echo off
cls

::AtPar.AssetManagement.WebApi
@RD /S /Q ".\WebApi\AtPar.AssetManagement.WebApi\bin\"
@RD /S /Q ".\WebApi\AtPar.AssetManagement.WebApi\obj\"

::AtPar.CartCount.WebApi
@RD /S /Q ".\WebApi\AtPar.CartCount.WebApi\bin\"
@RD /S /Q ".\WebApi\AtPar.CartCount.WebApi\obj\"

::AtPar.CycleCount.WebApi
@RD /S /Q ".\WebApi\AtPar.CycleCount.WebApi\bin\"
@RD /S /Q ".\WebApi\AtPar.CycleCount.WebApi\obj\"

::AtPar.Deliver.WebApi
@RD /S /Q ".\WebApi\AtPar.Deliver.WebApi\bin\"
@RD /S /Q ".\WebApi\AtPar.Deliver.WebApi\obj\"

::AtPar.Init.WebApi
@RD /S /Q ".\WebApi\AtPar.Init.WebApi\bin\"
@RD /S /Q ".\WebApi\AtPar.Init.WebApi\obj\"

::AtPar.ParManagement.WebApi
@RD /S /Q ".\WebApi\AtPar.ParManagement.WebApi\bin\"
@RD /S /Q ".\WebApi\AtPar.ParManagement.WebApi\obj\"

::AtPar.Pharmacy.WebApi
@RD /S /Q ".\WebApi\AtPar.Pharmacy.WebApi\bin\"
@RD /S /Q ".\WebApi\AtPar.Pharmacy.WebApi\obj\"

::AtPar.PickPlan.WebApi
@RD /S /Q ".\WebApi\AtPar.PickPlan.WebApi\bin\"
@RD /S /Q ".\WebApi\AtPar.PickPlan.WebApi\obj\"

::AtPar.POU.WebApi
@RD /S /Q ".\WebApi\AtPar.POU.WebApi\bin\"
@RD /S /Q ".\WebApi\AtPar.POU.WebApi\obj\"

::AtPar.Putaway.WebApi
@RD /S /Q ".\WebApi\AtPar.Putaway.WebApi\bin\"
@RD /S /Q ".\WebApi\AtPar.Putaway.WebApi\obj\"

::AtPar.Receiving.WebApi
@RD /S /Q ".\WebApi\AtPar.Receiving.WebApi\bin\"
@RD /S /Q ".\WebApi\AtPar.Receiving.WebApi\obj\"

::AtPar.StockIssue.WebApi
@RD /S /Q ".\WebApi\AtPar.StockIssue.WebApi\bin\"
@RD /S /Q ".\WebApi\AtPar.StockIssue.WebApi\obj\"

::AtPar.TrackIT.WebApi
@RD /S /Q ".\WebApi\AtPar.TrackIT.WebApi\bin\"
@RD /S /Q ".\WebApi\AtPar.TrackIT.WebApi\obj\"

::AtPar.WebApi
@RD /S /Q ".\WebApi\AtPar.WebApi\bin\"
@RD /S /Q ".\WebApi\AtPar.WebApi\obj\"


::AtPar.WebApi
@RD /S /Q ".\WebApi\AtPar.BinToBin.WebApi\bin\"
@RD /S /Q ".\WebApi\AtPar.BinToBin.WebApi\obj\"




::AtPar.AssetManagement.Service
@RD /S /Q ".\Business\AtPar.AssetManagement.Service\bin\"
@RD /S /Q ".\Business\AtPar.AssetManagement.Service\obj\"

::AtPar.AssetManagement.Service
@RD /S /Q ".\Business\AtPar.BinToBin.Service\bin\"
@RD /S /Q ".\Business\AtPar.BinToBin.Service\obj\" 

::AtPar.CartCount.Service
@RD /S /Q ".\Business\AtPar.CartCount.Service\bin\"
@RD /S /Q ".\Business\AtPar.CartCount.Service\obj\"

::AtPar.CycleCount.Service
@RD /S /Q ".\Business\AtPar.CycleCount.Service\bin\"
@RD /S /Q ".\Business\AtPar.CycleCount.Service\obj\"

::AtPar.Deliver.Service
@RD /S /Q ".\Business\AtPar.Deliver.Service\bin\"
@RD /S /Q ".\Business\AtPar.Deliver.Service\obj\"

::AtPar.Init.Service
@RD /S /Q ".\Business\AtPar.Init.Service\bin\"
@RD /S /Q ".\Business\AtPar.Init.Service\obj\"

::AtPar.ParManagement.Service
@RD /S /Q ".\Business\AtPar.ParManagement.Service\bin\"
@RD /S /Q ".\Business\AtPar.ParManagement.Service\obj\"

::AtPar.Pharmacy.Service
@RD /S /Q ".\Business\AtPar.Pharmacy.Service\bin\"
@RD /S /Q ".\Business\AtPar.Pharmacy.Service\obj\"

::AtPar.PickPlan.Service
@RD /S /Q ".\Business\AtPar.PickPlan.Service\bin\"
@RD /S /Q ".\Business\AtPar.PickPlan.Service\obj\"

::AtPar.POU.Service
@RD /S /Q ".\Business\AtPar.POU.Service\bin\"
@RD /S /Q ".\Business\AtPar.POU.Service\obj\"

::AtPar.Putaway.Service
@RD /S /Q ".\Business\AtPar.Putaway.Service\bin\"
@RD /S /Q ".\Business\AtPar.Putaway.Service\obj\"

::AtPar.Receiving.Service
@RD /S /Q ".\Business\AtPar.Receiving.Service\bin\"
@RD /S /Q ".\Business\AtPar.Receiving.Service\obj\"

::AtPar.Service.Interfaces
@RD /S /Q ".\Business\AtPar.Service.Interfaces\bin\"
@RD /S /Q ".\Business\AtPar.Service.Interfaces\obj\"

::AtPar.StockIssue.Service
@RD /S /Q ".\Business\AtPar.StockIssue.Service\bin\"
@RD /S /Q ".\Business\AtPar.StockIssue.Service\obj\"

::AtPar.TrackIT.Service
@RD /S /Q ".\Business\AtPar.TrackIT.Service\bin\"
@RD /S /Q ".\Business\AtPar.TrackIT.Service\obj\"

::AtPar.Common
@RD /S /Q ".\Common\AtPar.Common\bin\"
@RD /S /Q ".\Common\AtPar.Common\obj\"

::AtPar.Core
@RD /S /Q ".\Core\AtPar.POCOEntities\bin\"
@RD /S /Q ".\Core\AtPar.POCOEntities\obj\"

::AtPar.Core
@RD /S /Q ".\Core\AtPar.Repository.Interfaces\bin\"
@RD /S /Q ".\Core\AtPar.Repository.Interfaces\obj\"

::AtPar.Core
@RD /S /Q ".\Core\AtPar.Service.Interfaces\bin\"
@RD /S /Q ".\Core\AtPar.Service.Interfaces\obj\"



::AtPar.AssetManagement.Repos
@RD /S /Q ".\Data\AtPar.AssetManagement.Repos\bin\"
@RD /S /Q ".\Data\AtPar.AssetManagement.Repos\obj\"

::AtPar.CartCount.Repos
@RD /S /Q ".\Data\AtPar.CartCount.Repos\bin\"
@RD /S /Q ".\Data\AtPar.CartCount.Repos\obj\"

::AtPar.CycleCount.Repos
@RD /S /Q ".\Data\AtPar.CycleCount.Repos\bin\"
@RD /S /Q ".\Data\AtPar.CycleCount.Repos\obj\"

::AtPar.Deliver.Repos
@RD /S /Q ".\Data\AtPar.Deliver.Repos\bin\"
@RD /S /Q ".\Data\AtPar.Deliver.Repos\obj\"

::AtPar.Init.Repos
@RD /S /Q ".\Data\AtPar.Init.Repos\bin\"
@RD /S /Q ".\Data\AtPar.Init.Repos\obj\"

::AtPar.ParManagement.Repos
@RD /S /Q ".\Data\AtPar.ParManagement.Repos\bin\"
@RD /S /Q ".\Data\AtPar.ParManagement.Repos\obj\"

::AtPar.Pharmacy.Repos
@RD /S /Q ".\Data\AtPar.Pharmacy.Repos\bin\"
@RD /S /Q ".\Data\AtPar.Pharmacy.Repos\obj\"

::AtPar.PickPlan.Repos
@RD /S /Q ".\Data\AtPar.PickPlan.Repos\bin\"
@RD /S /Q ".\Data\AtPar.PickPlan.Repos\obj\"

::AtPar.POU.Repos
@RD /S /Q ".\Data\AtPar.POU.Repos\bin\"
@RD /S /Q ".\Data\AtPar.POU.Repos\obj\"

::AtPar.Putaway.Repos
@RD /S /Q ".\Data\AtPar.Putaway.Repos\bin\"
@RD /S /Q ".\Data\AtPar.Putaway.Repos\obj\"

::AtPar.Receiving.Repos
@RD /S /Q ".\Data\AtPar.Receiving.Repos\bin\"
@RD /S /Q ".\Data\AtPar.Receiving.Repos\obj\"

::AtPar.Repos.Interfaces
@RD /S /Q ".\Data\AtPar.Repos.Interfaces\bin\"
@RD /S /Q ".\Data\AtPar.Repos.Interfaces\obj\"

::AtPar.StockIssue.Repos
@RD /S /Q ".\Data\AtPar.StockIssue.Repos\bin\"
@RD /S /Q ".\Data\AtPar.StockIssue.Repos\obj\"

::AtPar.TrackIT.Repos
@RD /S /Q ".\Data\AtPar.TrackIT.Repos\bin\"
@RD /S /Q ".\Data\AtPar.TrackIT.Repos\obj\"

::AtPar.Data
@RD /S /Q ".\Data\AtPar.Data\bin\"
@RD /S /Q ".\Data\AtPar.Data\obj\"

::Atpar.Data.Mapping
@RD /S /Q ".\Data\Atpar.Data.Mapping\bin\"
@RD /S /Q ".\Data\Atpar.Data.Mapping\obj\"

::AtPar.Data.POCOEntities
@RD /S /Q ".\Data\AtPar.Data.POCOEntities\bin\"
@RD /S /Q ".\Data\AtPar.Data.POCOEntities\obj\"



::AtPar.Data.POCOEntities
@RD /S /Q ".\Data\AtPar.BinToBin.Repos\bin\"
@RD /S /Q ".\Data\AtPar.BinToBin.Repos\obj\"




::UserInterface
@RD /S /Q ".\UserInterface\AtPar.Web\bin\"
@RD /S /Q ".\UserInterface\AtPar.Web\obj\"

s

::AtPar.AssetManagement.ItegrationTests
@RD /S /Q ".\Tests\IntegrationTests\AtPar.AssetManagement.ItegrationTests\bin\"
@RD /S /Q ".\Tests\IntegrationTests\AtPar.AssetManagement.ItegrationTests\obj\"

::AtPar.BinToBin.IntegrationTests
@RD /S /Q ".\Tests\IntegrationTests\AtPar.BinToBin.IntegrationTests\bin\"
@RD /S /Q ".\Tests\IntegrationTests\AtPar.BinToBin.IntegrationTests\obj\" 

::AtPar.CartCount.IntegrationTests
@RD /S /Q ".\Tests\IntegrationTests\AtPar.CartCount.IntegrationTests\bin\"
@RD /S /Q ".\Tests\IntegrationTests\AtPar.CartCount.IntegrationTests\obj\"

::AtPar.CycleCount.IntegrationTests
@RD /S /Q ".\Tests\IntegrationTests\AtPar.CycleCount.IntegrationTests\bin\"
@RD /S /Q ".\Tests\IntegrationTests\AtPar.CycleCount.IntegrationTests\obj\"

::AtPar.Deliver.IntegrationTests
@RD /S /Q ".\Tests\IntegrationTests\AtPar.Deliver.IntegrationTests\bin\"
@RD /S /Q ".\Tests\IntegrationTests\AtPar.Deliver.IntegrationTests\obj\"

::AtPar.Init.IntegrationTests
@RD /S /Q ".\Tests\IntegrationTests\AtPar.Init.IntegrationTests\bin\"
@RD /S /Q ".\Tests\IntegrationTests\AtPar.Init.IntegrationTests\obj\"

::AtPar.ParManagement.IntegrationTests
@RD /S /Q ".\Tests\IntegrationTests\AtPar.ParManagement.IntegrationTests\bin\"
@RD /S /Q ".\Tests\IntegrationTests\AtPar.ParManagement.IntegrationTests\obj\"

::AtPar.Pharmacy.IntegrationTests
@RD /S /Q ".\Tests\IntegrationTests\AtPar.Pharmacy.IntegrationTests\bin\"
@RD /S /Q ".\Tests\IntegrationTests\AtPar.Pharmacy.IntegrationTests\obj\"

::AtPar.PickPlan.IntegrationTests
@RD /S /Q ".\Tests\IntegrationTests\AtPar.PickPlan.IntegrationTests\bin\"
@RD /S /Q ".\Tests\IntegrationTests\AtPar.PickPlan.IntegrationTests\obj\"

::AtPar.POU.IntegrationTests
@RD /S /Q ".\Tests\IntegrationTests\AtPar.POU.IntegrationTests\bin\"
@RD /S /Q ".\Tests\IntegrationTests\AtPar.POU.IntegrationTests\obj\"

::AtPar.Putaway.IntegrationTests
@RD /S /Q ".\Tests\IntegrationTests\AtPar.Putaway.IntegrationTests\bin\"
@RD /S /Q ".\Tests\IntegrationTests\AtPar.Putaway.IntegrationTests\obj\"

::AtPar.Receiving.IntegrationTests
@RD /S /Q ".\Tests\IntegrationTests\AtPar.Receiving.IntegrationTests\bin\"
@RD /S /Q ".\Tests\IntegrationTests\AtPar.Receiving.IntegrationTests\obj\"

::AtPar.IntegrationTests.Interfaces
@RD /S /Q ".\Tests\IntegrationTests\AtPar.IntegrationTests.Interfaces\bin\"
@RD /S /Q ".\Tests\IntegrationTests\AtPar.IntegrationTests.Interfaces\obj\"

::AtPar.StockIssue.IntegrationTests
@RD /S /Q ".\Tests\IntegrationTests\AtPar.StockIssue.IntegrationTests\bin\"
@RD /S /Q ".\Tests\IntegrationTests\AtPar.StockIssue.IntegrationTests\obj\"

::AtPar.TrackIT.IntegrationTests
@RD /S /Q ".\Tests\IntegrationTests\AtPar.TackIT.IntegrationTests\bin\"
@RD /S /Q ".\Tests\IntegrationTests\AtPar.TackIT.IntegrationTests\obj\"



::AtPar.Integration.Tests
@RD /S /Q ".\Tests\IntegrationTests\AtPar.Integration.Tests\bin\"
@RD /S /Q ".\Tests\IntegrationTests\AtPar.Integration.Tests\obj\"


::AtPar.IntegrationTest.Helper
@RD /S /Q ".\Tests\IntegrationTests\AtPar.IntegrationTest.Helper\bin\"
@RD /S /Q ".\Tests\IntegrationTests\AtPar.IntegrationTest.Helper\obj\"





::AtPar.AssetManagement.UnitTests
@RD /S /Q ".\Tests\UnitTests\AtPar.AssetManagement.UnitTests\bin\"
@RD /S /Q ".\Tests\UnitTests\AtPar.AssetManagement.UnitTests\obj\"

::AtPar.BinToBin.UnitTests
@RD /S /Q ".\Tests\UnitTests\AtPar.BinToBin.UnitTests\bin\"
@RD /S /Q ".\Tests\UnitTests\AtPar.BinToBin.UnitTests\obj\" 

::AtPar.CartCount.UnitTests
@RD /S /Q ".\Tests\UnitTests\AtPar.CartCount.UnitTests\bin\"
@RD /S /Q ".\Tests\UnitTests\AtPar.CartCount.UnitTests\obj\"

::AtPar.CycleCount.UnitTests
@RD /S /Q ".\Tests\UnitTests\AtPar.CycleCount.UnitTests\bin\"
@RD /S /Q ".\Tests\UnitTests\AtPar.CycleCount.UnitTests\obj\"

::AtPar.Deliver.UnitTests
@RD /S /Q ".\Tests\UnitTests\AtPar.Deliver.UnitTests\bin\"
@RD /S /Q ".\Tests\UnitTests\AtPar.Deliver.UnitTests\obj\"

::AtPar.Init.UnitTests
@RD /S /Q ".\Tests\UnitTests\AtPar.Init.UnitTests\bin\"
@RD /S /Q ".\Tests\UnitTests\AtPar.Init.UnitTests\obj\"

::AtPar.ParManagement.UnitTests
@RD /S /Q ".\Tests\UnitTests\AtPar.ParManagement.UnitTests\bin\"
@RD /S /Q ".\Tests\UnitTests\AtPar.ParManagement.UnitTests\obj\"

::AtPar.Pharmacy.UnitTests
@RD /S /Q ".\Tests\UnitTests\AtPar.Pharmacy.UnitTests\bin\"
@RD /S /Q ".\Tests\UnitTests\AtPar.Pharmacy.UnitTests\obj\"

::AtPar.PickPlan.UnitTests
@RD /S /Q ".\Tests\UnitTests\AtPar.PickPlan.UnitTests\bin\"
@RD /S /Q ".\Tests\UnitTests\AtPar.PickPlan.UnitTests\obj\"

::AtPar.POU.UnitTests
@RD /S /Q ".\Tests\UnitTests\AtPar.POU.UnitTests\bin\"
@RD /S /Q ".\Tests\UnitTests\AtPar.POU.UnitTests\obj\"

::AtPar.Putaway.UnitTests
@RD /S /Q ".\Tests\UnitTests\AtPar.Putaway.UnitTests\bin\"
@RD /S /Q ".\Tests\UnitTests\AtPar.Putaway.UnitTests\obj\"

::AtPar.Receiving.UnitTests
@RD /S /Q ".\Tests\UnitTests\AtPar.Receiving.UnitTests\bin\"
@RD /S /Q ".\Tests\UnitTests\AtPar.Receiving.UnitTests\obj\"

::AtPar.UnitTests.Interfaces
@RD /S /Q ".\Tests\UnitTests\AtPar.UnitTests.Interfaces\bin\"
@RD /S /Q ".\Tests\UnitTests\AtPar.UnitTests.Interfaces\obj\"

::AtPar.StockIssue.UnitTests
@RD /S /Q ".\Tests\UnitTests\AtPar.StockIssue.UnitTests\bin\"
@RD /S /Q ".\Tests\UnitTests\AtPar.StockIssue.UnitTests\obj\"

::AtPar.TrackIT.UnitTests
@RD /S /Q ".\Tests\UnitTests\AtPar.TrackIT.UnitTests\bin\"
@RD /S /Q ".\Tests\UnitTests\AtPar.TrackIT.UnitTests\obj\"




